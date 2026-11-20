/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { recommended } from '@nextcloud/eslint-config'

export default [
	...recommended,
	{
		// Reine Formatierungsregeln bleiben aus, das Projekt nutzt eine gewachsene Formatierung
		name: 'worktime/formatierung-aus',
		rules: {
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/html-indent': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/html-self-closing': 'off',
			'vue/first-attribute-linebreak': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'vue/attributes-order': 'off',
			'perfectionist/sort-imports': 'off',
			'perfectionist/sort-named-imports': 'off',
			'perfectionist/sort-exports': 'off',
			'perfectionist/sort-objects': 'off',
			'jsdoc/require-jsdoc': 'off',
			'jsdoc/require-param': 'off',
			'jsdoc/require-param-description': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns': 'off',
			'jsdoc/require-returns-description': 'off',
			'jsdoc/check-tag-names': 'off',
			'jsdoc/check-types': 'off',
			'jsdoc/escape-inline-tags': 'off',
			'antfu/top-level-function': 'off',
			'import-extensions/extensions': 'off',
			'import-extensions/ban-inline-type-imports': 'off',
			'vue/prefer-separate-static-class': 'off',
			'vue/new-line-between-multi-line-property': 'off',
			'vue/order-in-components': 'off',
			'vue/attribute-hyphenation': 'off',
			'vue/v-on-event-hyphenation': 'off',
			'vue/custom-event-name-casing': 'off',
			'vue/no-boolean-default': 'off',
			'perfectionist/sort-named-exports': 'off',
			'jsdoc/tag-lines': 'off',
			'jsdoc/reject-function-type': 'off',
			'jsdoc/reject-any-type': 'off',
			curly: 'off',
			'object-shorthand': 'off',
			'vue/define-macros-order': 'off',
		},
	},
	{
		name: 'worktime/stylistic-aus',
		rules: Object.fromEntries([
			'implicit-arrow-linebreak', 'exp-list-style', 'indent', 'quotes', 'semi',
			'comma-dangle', 'operator-linebreak', 'space-before-function-paren',
			'arrow-parens', 'brace-style', 'max-len', 'no-tabs', 'member-delimiter-style',
			'max-statements-per-line', 'function-paren-newline', 'quote-props',
			'no-multiple-empty-lines', 'indent-binary-ops', 'multiline-ternary',
		].map((r) => ['@stylistic/' + r, 'off'])),
	},
	{
		name: 'worktime/angepasste-regeln',
		rules: {
			// Datums-Schleifen mutieren die Laufvariable per Methode, das erkennt die Regel nicht
			'no-unmodified-loop-condition': 'off',
			// console.error ist die einzige Spur neben der sichtbaren Fehlermeldung
			'no-console': ['error', { allow: ['error'] }],
			// x == null prueft bewusst null und undefined zugleich
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			// Das geschuetzte Leerzeichen wuerde bestehende Uebersetzungsschluessel aendern
			'@nextcloud/l10n-non-breaking-space': 'off',
		},
	},
]
