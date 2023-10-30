import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// ----------------------------------------------------------------------

export default defineConfig({
  server: { https: true },
  plugins: [react(), mkcert()],
});
