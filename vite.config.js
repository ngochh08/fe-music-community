import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Tải các biến môi trường dựa trên chế độ (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Tất cả yêu cầu bắt đầu bằng /api sẽ được chuyển hướng đến Backend
        "/api": {
          target: env.VITE_BACKEND_API_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
