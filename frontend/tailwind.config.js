module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "monospace"]
      },
      colors: {
        graphite: "#050816",
        panel: "#0A0F1E",
        cyan: "#00F5FF",
        violet: "#7C3AED",
        sky: "#0EA5E9",
        mint: "#34D399",
        amber: "#F59E0B",
        rose: "#FB7185"
      }
    }
  },
  plugins: []
};

