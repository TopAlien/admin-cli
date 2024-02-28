import { defineConfig } from "vite";
import path from "path";
import UnoCSS from "unocss/vite";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), UnoCSS(), vitePluginForArco({ style: "css" })],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/styles/variables.less",
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
