import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export function ClerkSetup({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#0f172a',
          colorInputBackground: '#1e293b',
          colorInputText: '#e2e8f0',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          card: 'bg-slate-800 border border-slate-700',
          headerTitle: 'text-blue-400',
          socialButtonsBlockButton: 'border-slate-600',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default ClerkSetup;
