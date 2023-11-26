import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// ----------------------------------------------------------------------

export default defineConfig({
  envDir: "./config",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
