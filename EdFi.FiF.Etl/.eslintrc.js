module.exports = {
	"extends": ["airbnb", "prettier"],
	"plugins": ["prettier"],
	"rules": {
		"prettier/prettier": ["error"]
	},
	overrides: [
		{
			files: [
				"**/*.test.js",
				"**/*.test.jsx",
				"**/*.test.ts",
				"**/*.test.tsx"
			],
			rules: {
				"linebreak-style" : ["error", "unix"]
			}
		}
	]
};
