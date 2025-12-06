import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@types": path.resolve(__dirname, "src/types"),
            "@utils": path.resolve(__dirname, "src/utils"),
        },
    },
    base: "",
    plugins: [
        react(),
        dts({
            insertTypesEntry: true, // generates index.d.ts
            outDir: "dist", // ensures types go to dist/
        }),
    ],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "ReactFormDTO",
            fileName: (format) => `react-form-dto.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
