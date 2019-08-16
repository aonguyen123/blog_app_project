module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  rules: {
    "react/prop-types": 1, 
    "react/jsx-max-props-per-line": 0
  },
  plugins: ["prettier"]
};
