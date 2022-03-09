# GrapesJS Style Filter

This plugins adds a new `filter` [built-in style property](https://grapesjs.com/docs/modules/Style-manager.html#built-in-properties) which can be used for CSS properties like `filter` and `backdrop-filter`.

[Demo](https://jsfiddle.net/xg23astu)

<p align="center"><img src="https://user-images.githubusercontent.com/11614725/47965316-c0fd6f80-e045-11e8-8ce6-8b0251bf36a4.png" alt="GrapesJS" align="center"/></p>


> Requires GrapesJS v0.18.3 or higher





## Summary

* Plugin name: `grapesjs-style-filter`
* New Style Manager built-in property
  * `filter`




## Download

* CDN
  * `https://unpkg.com/grapesjs-style-filter`
* NPM
  * `npm i grapesjs-style-filter`
* GIT
  * `git clone https://github.com/artf/grapesjs-style-filter.git`





## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-style-filter.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  const editor = grapesjs.init({
      container : '#gjs',
      // ...
      plugins: ['grapesjs-style-filter'],

      // Use the property on init
      styleManager: {
        sectors: [
          // ...
          {
            id: 'extra',
            name: 'Extra',
            properties: [
              { extend: 'filter' },
              { extend: 'filter', property: 'backdrop-filter' },
            ],
          }
        ]
      },
  });

  // or add it to the StyleManager via API
  editor.StyleManager.addProperty('extra', { extend: 'filter' });
  editor.StyleManager.addProperty('extra', { extend: 'filter', property: 'backdrop-filter' });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import styleFilter from 'grapesjs-style-filter';

const editor = grapesjs.init({
  container : '#gjs',
  plugins: [styleFilter, /*...*/],
  // Same StyleManager configuration
});
// Same StyleManager API usage
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-style-filter.git
$ cd grapesjs-style-filter
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
