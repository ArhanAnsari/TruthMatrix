export const socialShare = {
  twitter: (text: string, url: string) => {
    const encoded = encodeURIComponent(`${text} ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
  },

  linkedin: (title: string, url: string) => {
    const encoded = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      "_blank"
    );
  },

  facebook: (url: string) => {
    const encoded = encodeURIComponent(url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      "_blank"
    );
  },

  whatsapp: (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  },

  email: (subject: string, body: string) => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  },

  copyToClipboard: async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  },

  print: () => {
    window.print();
  },

  downloadAsJSON: (data: any, filename: string = "analysis.json") => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};

export const keyboardShortcuts = {
  register: () => {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + Enter: Submit analysis
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        const analyzeBtn = document.querySelector("[data-analyze-btn]");
        if (analyzeBtn) {
          (analyzeBtn as HTMLButtonElement).click();
        }
      }

      // Ctrl/Cmd + S: Save/Print
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        window.print();
      }

      // Ctrl/Cmd + C: Copy result (when available)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        const resultText = document.querySelector("[data-copy-text]");
        if (resultText) {
          const text = resultText.textContent || "";
          navigator.clipboard.writeText(text);
        }
      }
    });
  },
};
