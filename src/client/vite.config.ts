import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// ----------------------------------------------------------------------

export default defineConfig({
  envDir: "../../",
  plugins: [react()],
});
