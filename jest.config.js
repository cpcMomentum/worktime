// Jest config for pure frontend-logic unit tests (worktime#405, 0.12.0 guard).
//
// Deliberately isolated from the webpack/@nextcloud babel setup: the transform
// passes `configFile: false, babelrc: false`, and there is no root babel.config
// — so this never influences the production build. Tests target plain ESM
// modules (no .vue rendering), e.g. src/router/access.js.

// Date tests must run in a zone east of UTC, where new Date('YYYY-MM-DD')
// is not local midnight (#761). Workers inherit this from the parent.
process.env.TZ = 'Europe/Berlin'

module.exports = {
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/frontend/**/*.spec.js'],
	transform: {
		'^.+\\.js$': ['babel-jest', {
			configFile: false,
			babelrc: false,
			presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
		}],
	},
}
