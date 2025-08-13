import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_BACKEND_AUTH_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/aki': {
                    target: env.VITE_BACKEND_PRODUCT_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/aki/, ''),
                },
            },
        },
    };
});
