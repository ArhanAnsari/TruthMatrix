import { Client, Storage, Databases, ID, Query, Account } from 'appwrite';

// Appwrite Configuration Constants
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'truthmatrix_db';
const APPWRITE_STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || 'truthmatrix_storage';

// Singleton client instances
let serverClient: Client | null = null;
let clientInstance: Client | null = null;

// Get or create server client
const getServerClient = () => {
  if (!serverClient) {
    serverClient = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
  }
  return serverClient;
};

// Get or create client instance
const getClientInstance = () => {
  if (!clientInstance) {
    clientInstance = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
  }
  return clientInstance;
};

// Appwrite Service Layer
export const appwriteService = {
  // Upload media file to storage
  async uploadMedia(file: File, userId: string, type: 'image' | 'video') {
    try {
      const client = getClientInstance();
      const storage = new Storage(client);

      const fileId = ID.unique();
      const response = await storage.createFile(
        APPWRITE_STORAGE_BUCKET_ID,
        fileId,
        file
      );

      return {
        success: true,
        fileId: response.$id,
        fileName: response.name,
        fileSize: response.sizeOriginal,
      };
    } catch (error) {
      console.error('Upload media error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  },

  // Save analysis result to database
  async saveAnalysis(
    userId: string,
    analysisData: any,
    mediaType: 'image' | 'video'
  ) {
    try {
      const client = getServerClient();
      const databases = new Databases(client);

      const documentData = {
        userId,
        mediaType,
        authenticityScore: analysisData.authenticityScore || 0,
        classification: analysisData.classification || 'UNKNOWN',
        confidence: analysisData.confidence || 0,
        deepfakeIndicators: JSON.stringify(analysisData.deepfakeIndicators || []),
        aiGenerationSigns: JSON.stringify(analysisData.aiGenerationSigns || []),
        manipulationSigns: JSON.stringify(analysisData.manipulationSigns || []),
        reasoning: analysisData.reasoning || '',
        recommendations: JSON.stringify(analysisData.recommendations || []),
        timestamp: new Date().toISOString(),
      };

      const response = await databases.createDocument(
        APPWRITE_DATABASE_ID,
        'analyses',
        ID.unique(),
        documentData
      );

      return {
        success: true,
        documentId: response.$id,
      };
    } catch (error) {
      console.error('Save analysis error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Save failed',
      };
    }
  },

  // Get analysis history for a user
  async getAnalysisHistory(userId: string, limit: number = 50) {
    try {
      const client = getServerClient();
      const databases = new Databases(client);

      const response = await databases.listDocuments(
        APPWRITE_DATABASE_ID,
        'analyses',
        [
          Query.equal('userId', userId),
          Query.orderDesc('$createdAt'),
          Query.limit(limit),
        ]
      );

      return response.documents.map((doc: any) => ({
        $id: doc.$id,
        userId: doc.userId,
        mediaType: doc.mediaType,
        authenticityScore: doc.authenticityScore,
        classification: doc.classification,
        confidence: doc.confidence,
        deepfakeIndicators: JSON.parse(doc.deepfakeIndicators || '[]'),
        aiGenerationSigns: JSON.parse(doc.aiGenerationSigns || '[]'),
        manipulationSigns: JSON.parse(doc.manipulationSigns || '[]'),
        reasoning: doc.reasoning,
        recommendations: JSON.parse(doc.recommendations || '[]'),
        timestamp: doc.timestamp,
        $createdAt: doc.$createdAt,
      }));
    } catch (error) {
      console.error('Get analysis history error:', error);
      return [];
    }
  },

  // Get single analysis
  async getAnalysis(documentId: string) {
    try {
      const client = getServerClient();
      const databases = new Databases(client);

      const doc = await databases.getDocument(
        APPWRITE_DATABASE_ID,
        'analyses',
        documentId
      );

      return {
        $id: doc.$id,
        userId: doc.userId,
        mediaType: doc.mediaType,
        authenticityScore: doc.authenticityScore,
        classification: doc.classification,
        confidence: doc.confidence,
        deepfakeIndicators: JSON.parse(doc.deepfakeIndicators || '[]'),
        aiGenerationSigns: JSON.parse(doc.aiGenerationSigns || '[]'),
        manipulationSigns: JSON.parse(doc.manipulationSigns || '[]'),
        reasoning: doc.reasoning,
        recommendations: JSON.parse(doc.recommendations || '[]'),
        timestamp: doc.timestamp,
      };
    } catch (error) {
      console.error('Get analysis error:', error);
      throw new Error('Failed to fetch analysis');
    }
  },

  // Delete analysis
  async deleteAnalysis(documentId: string) {
    try {
      const client = getServerClient();
      const databases = new Databases(client);

      await databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        'analyses',
        documentId
      );

      return { success: true };
    } catch (error) {
      console.error('Delete analysis error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  },

  // Export all analyses for a user
  async exportUserAnalyses(userId: string) {
    try {
      const analyses = await this.getAnalysisHistory(userId, 1000);
      return analyses;
    } catch (error) {
      console.error('Export error:', error);
      return [];
    }
  },

  // Authentication Methods
  async register(email: string, password: string, name: string) {
    try {
      const client = getClientInstance();
      const account = new Account(client);
      
      const response = await account.create(ID.unique(), email, password, name);
      return { success: true, user: response };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Registration failed' };
    }
  },

  async login(email: string, password: string) {
    try {
      const client = getClientInstance();
      const account = new Account(client);
      
      const response = await account.createEmailPasswordSession(email, password);
      return { success: true, session: response };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  },

  async logout() {
    try {
      const client = getClientInstance();
      const account = new Account(client);
      
      await account.deleteSession('current');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Logout failed' };
    }
  },

  async getCurrentUser() {
    try {
      const client = getClientInstance();
      const account = new Account(client);
      
      const user = await account.get();
      return { success: true, user };
    } catch (error) {
      console.error('Get current user error:', error);
      return { success: false, user: null };
    }
  },

  async updateProfile(name: string, password?: string) {
    try {
      const client = getClientInstance();
      const account = new Account(client);
      
      const updates: any = {};
      if (name) {
        updates.name = name;
      }
      if (password) {
        updates.password = password;
      }
      
      const response = await account.updateName(name);
      return { success: true, user: response };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Update failed' };
    }
  },
};
