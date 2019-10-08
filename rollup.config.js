import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'components/vscodeWebviewElements.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve(),
    production && minifyHTML(),
    production && terser({
      output: {
        comments: false,
      },
    }),
  ],
}
