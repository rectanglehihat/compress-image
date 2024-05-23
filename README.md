# compress-image


## setting
### Eslint
  - 코드의 문법 검사와 포매팅을 위한 설정
  - `package.json`의 `script`
    - `--fix` 옵션으로 코드를 고칠 수 있도록 함
    - `--cache` 옵션으로 변경된 코드만 새롭게 체크, lint를 돌릴 때마다 파일이 변경되지 않았다면 캐시에 있는 lint 결과 사용
  - `eslint.config.js`
    - env: eslint 문법 검사의 환경 지정
    - parserOptions: Javascript 언어 옵션 지정
    - extends: 권장되는 rules를 가진 라이브러리
    - rules: 각 스타일에 맞게 error 또는 warning 띄우는 규칙 설정
    - ignores: lint 체크를 하고 싶지 않은 파일 명시
<br/>

### Prettier
  - 코드 포매팅을 위해 설정
  - `package.json`의 `script`
    - `--write` 옵션을 사용하여 수정하고
    - `--cache` 옵션을 사용하여 캐시 함
  - `.prettierrc` 파일로 설정
<br/>

### Husky
  - commit 전에 eslint와 prettier를 실행시켜 해당 설정에 맞지 않으면 commit 막기 위해 설정
<br/>

### Lint-staged
  - 스테이징된 git 파일에 대해서만 린터를 실행하도록 설정
<br/>

### Webpack
  - 번들링 처리를 위한 설정
  - `webpack.common.js`
    - `mode`에 따라 webpack 설정을 다르게 하기 앞서 공통으로 사용할 설정 파일
    - `entry`: webpack이 빌드를 시작할 위치. 이 지점부터 모듈 그래프를 구성하고 필요한 모든 모듈을 결합하여 하나의 번들 파일로 생성
    - `output`: 번들링된 파일의 위치`path`와 이름`filename` 지정
    - `stats`: 번들링을 진행하면서 터미널에 표시할 번들된 정보 지정
  - `webpack.dev.js`
    - 개발 모드에서 진행할 webpack 설정
    - `devtool: 'inline-source-map'`: 소스 맵을 별도의 파일로 생성하지 않고 번들 파일에 인라인으로 포함시켜 디버깅 정보 제공. 브라우저에서 디버깅 쉽게 할 수 있도록 함 (번들 파일에 포함되기 때문에 소스 코드 노출의 우려가 있으므로 개발 환경에서만 사용)
    - `module.rules`: 로더 설정
      > 로더: 모듈의 소스 코드에 변경 사항을 적용합니다. 파일을 import 하거나 “로드”할 때 전처리를 할 수 있습니다. 따라서 로더는 다른 빌드 도구의 “태스크”와 유사하며 프런트엔드 빌드 단계를 처리하는 강력한 방법을 제공합니다. 로더는 파일을 TypeScript와 같은 다른 언어에서 JavaScript로 변환하거나 인라인 이미지를 데이터 URL로 로드 할 수 있습니다. 로더를 사용하면 JavaScript 모듈에서 직접 CSS 파일을 import 하는 작업도 수행 할 수 있습니다!
    - .css, .scss, .sass 파일 확장자를 `test: /\.(sa|sc|c)ss$/` 웹팩 내부로 로드`css-loader` 시키고, 그렇게 로드 시킨 css를 style 태그에 주입시킴`style-loader`
    - Webpack은 Node.js 위에서 돌아가는 프로그램이기 때문에 기본적으로 CSS, Images, Fonts등의 파일을 이해하지 못함. 로더는 이러한 파일을 Webpack이 해석할 수 있도록 변환하는 작업 수행
    - `plugins`
      > 플러그인: plugins 옵션은 다양한 방법으로 webpack 빌드 프로세스를 사용자 정의하는 데 사용됩니다. Webpack은 사용 가능한 다양한 내장 플러그인을 webpack.[plugin-name]으로 제공합니다. 플러그인 및 문서 목록은 [Plugins 페이지](https://webpack.kr/plugins)를 참고하세요.
      - `new Dotenv({ path: './.env.development' })`: .env.development 파일에 정의된 환경 변수를 애플리케이션에 로드하여 애플리케이션이 환경 변수에 접근할 수 있게 함
      - 플러그인은 번들링 과정 자체에 기능을 추가하거나 변경하는 역할

  - `webpack.prod.js`
    - 운영 모드에서 진행할 webpack 설정
    - 코드 압축, 최적화, 난독화를 포함한 다양한 최적화 작업을 수행하여 최종 번들의 크기를 줄이고 성능 향상을 목표로 함
    - `MiniCssExtractPlugin`: CSS파일을 필요로하는 JS파일만 CSS파일 생성
    - `optimization`: 번들 최적화 설정
      - `minimizer`: 최적화에 사용되는 플러그인 지정
      - `CssMinimizerPlugin`: CSS 파일을 최적화하고 압축
      - ~`TerserPlugin`: JavaScript 파일을 압축하고 난독화합니다. 이는 파일 크기를 줄이고, 코드 실행 성능을 높임~ -> webpack 5버전부터 기본으로 지원

  - `webpack.config.js`
    - mode에 따라 분기 처리 한 설정 파일

  - `babel-loader`
    - Webpack으로 JavaScript 파일을 번들링할 때 Babel을 사용할 수 있도록 함
    - `.babelrc` 파일이나 `babel.config.js` 파일을 만들면 `babel-loader`가 이 설정을 자동으로 읽음

  - ~`clean-webpack-plugin`: Webpack에 의해 빌드 된 결과물을 자동 정리하는 플러그인~ -> node v10+, webpack v4+ 부터 기본 지원

  - `css-minimizer-webpack-plugin`: css 파일을 압축하고 최소화

  - `mini-css-extract-plugin`
    - CSS가 포함된 JS 파일당 별도의 CSS 파일 생성
    - CSS 코드를 JavaScript 번들에 내장하지 않고 별도의 CSS 파일로 생성하기때문에 JavaScript와 CSS를 분리하여 병렬로 로드할 수 있어 초기 로드 시간 단축
    - CSS 파일이 JavaScript 번들에 포함되지 않아 브라우저에서 CSS 파일을 효율적으로 캐싱할 수 있습니다. 캐싱된 CSS 파일은 JavaScript 코드가 변경되어도 다시 다운로드할 필요가 없습니다.
    - webpack 5버전부터 사용 가능
   
  - `dotenv-webpack`
    - Webpack 번들링 프로세스에서 환경 변수를 관리하기 위한 플러그인
    - Webpack 번들링 과정에서 환경 변수 값이 코드에 주입되어 process.env.API_KEY, process.env.BASE_URL 등으로 해당 값에 접근 가능

  - `html-webpack-plugin`
    - Webpack은 기본적으로 HTML 파일을 생성하지 않기 때문에 이 플러그인을 사용하여 빌드 프로세스 중에 자동으로 HTML 파일을 생성
    - 생성된 HTML 파일에 Webpack에 의해 번들링된 JavaScript 파일을 자동으로 주입 함
    - 번들링된 CSS, 이미지, 폰트 등의 애셋 파일에 대한 참조를 HTML에 자동으로 추가하고, 애셋 경로 업데이트나 캐싱을 위한 해시 추가 등의 작업 수행
      
      > 이 플러그인은 매번 컴파일에 변경되는 해시로 된 파일 이름을 가진 webpack 번들에 특히 유용합니다.
        ```
        output: {
          filename: '[name]_[chunkhash:8].js'
        }
        ```

        일반적으로 Webpack은 캐싱과 긴 캐시 만료 시간을 위해 번들 파일 이름에 고유한 해시값을 포함시킵니다 (예: main_a1b2c3d4.js). HTML 파일에서 번들 파일을 참조할 때마다 고유한 해시값이 포함된 파일 이름을 사용해야 하는데 매번 수동으로 HTML 파일을 업데이트하는 것은 번거로운 작업 입니다. 이때 `html-webpack-plugin`을 사용하면 Webpack이 자동으로 HTML 파일을 생성하고 올바른 번들 파일 이름을 삽입해줍니다. 해시값이 변경되어도 HTML 파일은 항상 최신 번들 파일을 참조하게 됩니다.

<br/>

### Babel
  - @babel/core: Babel의 핵심 패키지로 코드를 파싱하고 변환하는 컴파일러 기능 제공. 단독으로는 작동하지 않고 플러그인과 프리셋을 통해 확장
  - core-js
    - ECMAScript를 지원하는 polyfill 라이브러리 모음 (Promise, Symbol, Map, Set 등의 객체와 함수를 폴리필)
    - babel과 함께 사용해 최신 자바스크립트 코드를 변환할 때 필요한 폴리필 제공
    - @babel/preset-env와 연계하여 타깃 브라우저에 맞춰 필요한 폴리필만 포함하도록 설정
  - `.babelrc`
    - `preset`: Babel에게 어떤 플러그인 모음을 적용할지 지정하는 옵션으로 preset에 포함된 플러그인을 모두 적용하여 코드 변환
    - `@babel/preset-env`
      - 미리 정해진 플러그인 집합으로 지정한 브라우저 환경에 맞춰 ES6+ 코드를 ES5 코드로 변환
      - `useBuiltIns: 'usage'`: 필요한 폴리필만 가져옴 (예를 들어 코드에서 Promise를 사용했다면 Promise 폴리필만 가져옴)
      - `corejs: { version: 3 }`: 폴리필을 제공하는 core-js 라이브러리 버전 지정
      - 타깃 브라우저로 브라우저 목록 구성 소스(`target` 필드 또는 `package.json`의 `browserslist` 또는 `.browserslistrc` 파일) 사용
      - `.babelrc` 파일에 `target` 필드로 사용가능하지만 Babel, Autoprefixer, ESLint 등 다양한 도구에서 참조할 수 있도록 package.json에서 설정함(`.browserslistrc` 파일로 따로 관리해도 동일함)
        
        ```
        // package.json
        "browserslist": {
          "production": [
            ">0.2%",  // 전 세계 사용자의 0.2% 이상 점유율을 가진 모든 브라우저 버전 지원
            "not dead",  // 24개월 이내에 업데이트와 점유율이 있는 브라우저 지원
            "not op_mini all"  // Opera Mini 브라우저 제외
          ],
          "development": [
            "last 1 chrome version",  // 크롬 최신 버전 지원
            "last 1 firefox version",  // 파이어폭스 최신 버전 지원
            "last 1 safari version"  // 사파리 최신 버전 지원
          ]
        },
      - `@babel/preset-typescript`: Babel에서 TypeScript 코드를 JavaScript로 변환하는 플러그인
<br/>

### typescript
  - `@babel/preset-typescript`: Babel에서 ts 파일을 js로 변환하고 구버전으로 트랜스파일링 진행. TypeScript 코드를 JavaScript로 변환하는 플러그인

<br/>
