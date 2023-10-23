import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import dns from "dns";

// Makes sure host stays as 'localhost' not IP.
dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  base: "",
  plugins: [react(), viteTsconfigPaths()],
  server: {
    host: "localhost",
    // This ensures that the browser opens upon server start.
    open: true,
    port: 3000,
  },
});
