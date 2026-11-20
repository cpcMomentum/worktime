import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// __dirname entfaellt mit dem nativen Config-Loader von Vite
const dirname = import.meta.dirname

// @nextcloud/vue liest beide Globals; der Name muss die App-ID sein, die Version kommt aus info.xml
const appName = JSON.parse(readFileSync(resolve(dirname, 'package.json'), 'utf8')).name
const appVersion = readFileSync(resolve(dirname, 'appinfo/info.xml'), 'utf8')
	.match(/<version>([^<]+)<\/version>/)?.[1]
if (!appVersion) {
	throw new Error('vite.config.js: <version> nicht in appinfo/info.xml gefunden')
}

export default defineConfig(({ mode }) => ({
	// Leerraum zwischen Elementen bleibt wie unter Vue 2 erhalten, sonst kleben Inline-Elemente aneinander
	plugins: [vue({ template: { compilerOptions: { whitespace: 'preserve' } } })],
	define: {
		// Im Library-Modus ersetzt Vite NODE_ENV nicht selbst, Vue bliebe sonst im Entwicklungspfad
		'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
		// Auffangnetz fuer uebrige process.env-Zugriffe aus Abhaengigkeiten
		'process.env': {},
		__VUE_OPTIONS_API__: true,
		__VUE_PROD_DEVTOOLS__: false,
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
		appName: JSON.stringify(appName),
		appVersion: JSON.stringify(appVersion),
	},
	resolve: {
		alias: {
			vue: resolve(dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
			'@': resolve(dirname, 'src'),
		},
		dedupe: ['vue'],
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		// ES-Modul statt iife: der FilePicker wird dynamisch importiert, iife kann kein Code-Splitting
		lib: {
			entry: resolve(dirname, 'src/main.js'),
			name: 'worktime',
			formats: ['es'],
			fileName: () => 'js/worktime-main.mjs',
		},
		rollupOptions: {
			output: {
				// Hash im Namen, weil Chunks ohne Nextclouds ?v=-Parameter geladen werden
				chunkFileNames: 'js/[name]-[hash].chunk.mjs',
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'css/worktime-main.css'
					}
					return 'css/[name][extname]'
				},
			},
		},
	},
}))
