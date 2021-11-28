module.exports = {
	"extends": "react-app",
	"rules": {
		"indent": ["warn", "tab", {"SwitchCase": 1}],
		"comma-dangle": ["warn", "never"],
		"arrow-parens": ["warn", "as-needed", { "requireForBlockBody": true }],
		"no-console": "warn",
		"no-unused-vars": ["warn", {
			"vars": "local",
			"args": "none"
		}],
		"no-multiple-empty-lines": ["warn", {"max": 2}],
		"react/prop-types": ["warn", { "skipUndeclared": true }],
		"react/jsx-filename-extension": "off",
		"react/no-unescaped-entities": "off",
		// "react/display-name": "off",                        // To support HOC's with redux-react
		"linebreak-style": "off",
		"semi": "off",
		"no-tabs": "off"
	}
};
