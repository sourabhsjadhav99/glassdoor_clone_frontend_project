// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/search': {
                target: 'https://serpapi.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/search/, '/search'),
            },
            // '/api/location': {
            //     target: 'https://serpapi.com',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api\/location/, '/locations'), // Adjust the endpoint if necessary
            // },
        },
    },
});
