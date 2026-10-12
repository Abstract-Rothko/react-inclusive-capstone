import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    build: { sourcemap: false },
    test: {
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
        globals: true,
        css: false,
        restoreMocks: true,
        include: ['src/**/*.test.{js,jsx}']
    }
});
