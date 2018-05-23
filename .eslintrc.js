
const devRules = {
  "no-unused-vars": "off",
  "consistent-return": "off",
  "react/prop-types": "off",
  "react/forbid-prop-types": "off",
  "no-script-url": "off",
  "no-undef": "off",
  "max-len": "off",
  "no-console": "off",
  "quotes": "off",
  "comma-dangle": "off",
  "no-trailing-spaces": "off",
}

const config = {
  "extends" : "airbnb",
  "parser": "babel-eslint",
  "rules": {
  	"no-plusplus": 2,
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/alt-text": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    ...devRules
  },
  "env": {
    "jest": true
  }
}

module.exports = config;
