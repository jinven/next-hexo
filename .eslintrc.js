// https://eslint.org/docs/
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        "ecmaVersion": 11,
        parser: 'babel-eslint',
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    extends: [
        'prettier',
        'plugin:prettier/recommended'
    ],
    plugins: [
        'prettier'
    ],
    // add your custom rules here
    rules: {
        // 禁止使用 console: 0 = off, 1 = warn, 2 = error
        "no-console": 1,
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        // https://prettier.io/
        "prettier/prettier": [
          "error",
          {
            // auto lf(\n) crlf(\r\n) cr(\r)
            "endOfLine": "crlf",
            "singleQuote": true,
            "trailingComma": "none",
            "bracketSpacing": true,
            "printWidth": 300,
            // 句尾添加分号
            "prettier.semi": true,
            "jsxBracketSameLine": true,
            "tabWidth": 4,
            // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
            "trailingComma": "all"
          }
        ]
    }
}
