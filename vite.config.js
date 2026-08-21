import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

VitePWA({
  registerType: "autoUpdate",

  manifest: {
    name: "Moments",
    short_name: "Moments",
    description: "Your Personal Diary",
    theme_color: "#231942",
    background_color: "#ffffff",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",

    icons: [
      {
        src: "moments-icon.png",
        sizes: "736x736",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  }
})
  ]

});