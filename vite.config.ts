import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin({ topExecutionPriority: false }),
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: 'tsconfig.node.json',
    }),
    viteTsconfigPaths(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src'),
      name: 'export-test-didi',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
        banner: '"use client";',
        interop: 'compat',
      },
    },
    commonjsOptions: {
      esmExternals: ['react'],
    },

    emptyOutDir: false,
  },
});
