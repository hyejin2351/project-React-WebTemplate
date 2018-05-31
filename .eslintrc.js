
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
  "global-require": "off",
  "spaced-comment": "off",
  "no-underscore-dangle": "off",
  "no-param-reassign": "off",
  "react/no-unescaped-entities": "off",
  "jsx-a11y/anchor-has-content": "off",
  "react/jsx-indent": "off",
  "jsx-a11y/alt-text": "off",
  "react/require-default": "off",
  "react/require-default-props": "off",
  "react/no-did-mount-set-state": "off",
  "no-multi-assign": "off",
  "one-var": "off",
  "class-methods-use-this": "warning",

}

const devDangerousRules = {
  "class-methods-use-this": "off",
  
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
    ...devRules,
    ...devDangerousRules,
  },
  "env": {
    "jest": true
  }
}

module.exports = config;
