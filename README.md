# GrapesJS Style Filter

Add `filter` type input to the Style Manager in GrapesJS

[Demo](https://grapesjs.com/demo.html)

> Requires GrapesJS v0.14.40 or higher





## Summary

* Plugin name: `grapesjs-style-filter`
* StyleManager types
  * `filter`





## Options

|Option|Description|Default|
|-|-|-
|`option1`|Description option|`default value`|





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
  var filterInput = {
    name: 'Filter',
    property: 'filter',
    type: 'filter', // <- the new type
    full: 1,
  };

  var editor = grapesjs.init({
      container : '#gjs',
      // ...
      plugins: ['grapesjs-style-filter'],
      pluginsOpts: {
        'grapesjs-style-filter': { /* options */ }
      },
      // Use the type on init
      styleManager: {
        // ...
        sectors: [
          // ...
          {
            name: 'Extra',
            buildProps: ['filter', 'opacity', ...],
            properties: [ filterInput ],
          }
      },
  });

  // or add it to the StyleManager via API
  editor.StyleManager.addProperty('Extra', filterInput);
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import styleFilter from 'grapesjs-style-filter';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [styleFilter],
  pluginsOpts: {
    [styleFilter]: { /* options */ }
  }
  // or
  plugins: [
    editor => styleFilter(editor, { /* options */ }),
  ],
});
// Same StyleManager usage
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
