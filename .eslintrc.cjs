module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  rules: {
    // 기본
    'nonblock-statement-body-position': ['error', 'beside'], // if, else, for, while 문 등의 중괄호 뒤 개행 여부
    'object-curly-spacing': ['error', 'always'], // 객체 리터럴에서 {, } 사이의 공백 사용
    'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 사용시 경고
    'no-alert': 'off', // alert 사용 허용
    'global-require': 'off', // require이 파일의 상단에 위치하지 않아도 되도록 함 (for tailwindcss)
    'prefer-arrow-callback': 'error', // 콜백 함수에 화살표 함수 사용 강제
    'arrow-body-style': 'off', // 화살표 함수 중괄호 사용 제약 제거
    'no-param-reassign': 'off', // 매개변수 재할당 허용 (immer, reduce 사용시 필요)
    'class-methods-use-this': 'off', // 클래스 메서드 내에서 this 사용하지 않아도 되도록 함
    'no-underscore-dangle': 'off', // prefix _ 사용 허용
    'import/no-cycle': 'off', // 순환 참조 허용
    'no-plusplus': 'off', // ++, -- 사용 허용
    '@typescript-eslint/no-var-requires': 'off',

    // typescript
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error', // type import 시 import { type } from '...' 사용 강제
    '@typescript-eslint/no-inferrable-types': 'error', // 타입 추론 가능한 경우 타입 명시 금지
    '@typescript-eslint/no-non-null-assertion': 'error', // a!.value 사용 금지

    // react
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // import 순서 관련
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'next'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
  },
};
