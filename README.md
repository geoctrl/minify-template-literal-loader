# Minify Template Literal Loader
Webpack loader that minifies javascript files that contain template literals

## Peer Dependency

[`html-minifier`](https://github.com/kangax/html-minifier)

## What this loader does

This loader takes `.js` template files and minifies them with `html-minifier`.

```javascript
// converts this:
export default
`<div>
    Awesome Template
</div>`;
 
// to this:
export default `<div>Awesome Template</div>`;
```

## Why?

Although webpack can be extremely powerful, it does some unconventional things to get results - like importing html...

```javascript
// let's face it, this is weird
import template from 'template.html';
```

The above line of code is not native javascript, and even when ES modules are widely supported in all browsers, you'll still need webpack to process this.

#### Reasons to use template literals as templates:

- Writing templates in javascript gives us a nice way to import them anywhere we need it - no preprocessing needed when ES modules are supported.
- Don't get stuck in webpack! All this loader does is minify html.
- Interpolate as needed:
  
  ```javascript
  import svgTemplate from './svgTemplate';
  export default `<div>${svgTemplate}</div>`;
  ```
  
- You can tag your template literals to add some extra processing on the client side:

  ```javascript
  export default doMoreThings `<div>template</div>`
  ```

## Install

```bash
$ npm install -D minify-template-literal-loader html-minifier
```

## Use

Add this loader to your webpack rules **BEFORE** running through a transpiler like babel.

Remember, webpack runs loaders right-to-left, and bottom-to-top:

```javascript
config.module.rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader'
  },
  {
    test: /\.template\.js$/,
    loader: 'minify-template-literal-loader',
    options: {
      caseSensitive: true,
      collapseWhitespace: true
    }
  }
]
```

## Options

The options object is a pass-through to the `html-minifier` options. Go to [html-minifier's github page](https://github.com/kangax/html-minifier#options-quick-reference) to learn more.
