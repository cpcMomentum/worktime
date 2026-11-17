import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Datumstests brauchen eine Zone oestlich von UTC
process.env.TZ = 'Europe/Berlin'

export default defineConfig({
	// Leerraum zwischen Elementen bleibt wie unter Vue 2 erhalten, sonst kleben Inline-Elemente aneinander
	plugins: [vue({ template: { compilerOptions: { whitespace: 'preserve' } } })],
	resolve: {
		alias: {
			'@': resolve(import.meta.dirname, 'src'),
		},
	},
	test: {
		environment: 'happy-dom',
		include: ['tests/frontend/**/*.spec.{ts,js}', 'src/**/*.{spec,test}.{ts,js}'],
	},
})
