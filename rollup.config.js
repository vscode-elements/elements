import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/vsc-we.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    !production && livereload(),
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
