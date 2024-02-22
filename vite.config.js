import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import UnFonts from 'unplugin-fonts/vite';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
	plugins: [
		vue(),
		UnFonts({
			google: {
				families: [
					{
						name: 'Noto+Sans+JP',
						styles: 'wght@400;700',
					},
				],
			},
		}),
		Icons({
			customCollections: {
				svg: FileSystemIconLoader('src/public/assets/svg'),
			},
		}),
	],
	base: './',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	root: './src',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.')[1];
					if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
						extType = 'fonts';
					}
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = 'img';
					}
					return `assets/${extType}/[name][extname]`;
				},
				entryFileNames: 'assets/js/[name].js',
				chunkFileNames: 'assets/js/[name].js',
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "./src/scss/util/util.scss" as *;', // グローバルなscss
			},
		},
	},
});
