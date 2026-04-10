import nextVitals from "eslint-config-next/core-web-vitals"

export default [
  ...nextVitals,
  {
    rules: {
      "no-console": "error",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/display-name": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
]
