import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// ----------------------------------------------------------------------

export default defineConfig({
  envDir: "./config",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
