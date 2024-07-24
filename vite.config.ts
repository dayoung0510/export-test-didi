import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import terser from '@rollup/plugin-terser';

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
    commonjs(),
  ],
  server: {
    port: 5173,
    // // socket 요청을 ws.zigap.io로 프록시
    // proxy: {
    //   '/socket.io': {
    //     target: 'https://ws.zigap.io',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //   },
    // },
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, './src'),
      name: 'export-test-didi',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      plugins: [terser()], // 난독화를 위함
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        preserveModules: false,
        // 글로벌즈 주석 푸니까 민터스에서 import 제대로 된다...
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
      transformMixedEsModules: true,
      esmExternals: ['react'],
    },

    emptyOutDir: false,
  },
});
