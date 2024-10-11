import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    "process.env": {},
    server: {
      host: "0.0.0.0", // Make the app accessible on your local network (local IP)
      port: 3111,      // Optional: Set your preferred port
    },
  },
});
