import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        host: '0.0.0.0',   // ⬅️ WAJIB
        port: 5173,
        cors:true,
        strictPort: true,
        hmr: {
          host: 'host.docker.internal', // ⬅️ WAJIB utk Docker
        },
      },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/react/app.tsx'],
            refresh: true,
        }),
        react(),   
        tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/react/vuexy/src'),
        '@core': path.resolve(__dirname, 'resources/react/vuexy/src/@core'),
        '@components': path.resolve(__dirname, 'resources/react/vuexy/src/components'),
        '@menu': path.resolve(__dirname, 'resources/react/vuexy/src/@menu'),
        '@layouts': path.resolve(__dirname, 'resources/react/vuexy/src/@layouts'),
        '@views': path.resolve(__dirname, 'resources/react/vuexy/src/views'),
        '@configs': path.resolve(__dirname, 'resources/react/vuexy/src/configs')
      }
    }
});
