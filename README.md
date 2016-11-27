# TUI JSDoc Template
Toast UI JSDoc template

Demo: https://nhnent.github.io/tui.jsdoc-template/latest/

## install

```
npm i -D tui-jsdoc-template
```

## Feature

TUI JSDoc template has the following features:

* Navigation:
  * AutoComplete Searchbox
  * Collapsible
  * Members / Methods / Events
  * API / Examples (Tutorials) switcher
  * Resizable
* Examples: HTML/JS source tab in example pages
+ Version switcher: Allows to switch to older API versions 

![Example](https://cloud.githubusercontent.com/assets/441011/20415434/7ca5c48c-ad38-11e6-9221-9be654bd0b36.png)

## Configuration

See [*JSDoc page - configuration*](http://usejsdoc.org/about-configuring-jsdoc.html#incorporating-command-line-options-into-the-configuration-file) for default setup.

### Template

```json
"opts": {
  "template": "node_modules/tui-jsdoc-template"
}
```

### Logo

```json
"templates": {
    "logo": {
        "url": "http://nhnent.github.io/tui.component.tree/latest/styles/logo.png",
        "width": "150px",
        "height": "13px"
    }
}
```

### Page title

```json
"templates": {
    "name": "Tui JSDoc Template"
}
```

### Footer text

```json
"templates": {
    "footerText": "My awesome footer text"
}
```

### Version switcher

Activates the version switcher:
```json
"templates": {
    "versionSwitcher": true
}
```

Limits versions to the ones defined via `versions`:
```json
"templates": {
    "versionSwitcher": {
        "versions": ["1.0.0", ">=1.0.3"]
    }
}
```
*The `versions` property accepts valid semver ranges. See [npm semver calculator](https://semver.npmjs.com/) for examples.*

Exclude release levels:
```json
"templates": {
    "versionSwitcher": {
        "excludeLevel": "patch"
    }
}
```

**Please note:**
 * The version switcher gets the versions via Git tags. But JSDoc only generates the current sources. So keep in mind that you have to generate the docs for each tag. Otherwise switching versions will lead to 404 errors.
 * You have to provide the current version via `opts.package`. See example configuration below.

### Example configuration

 ```json
 {
   "plugins": ["plugins/markdown"],
   "markdown": {
     "parser": "gfm",
     "hardwrap": true
   },
   "templates": {
     "name": "Doc Template",
     "footerText": "NHN Entertainment Frontend Development Lab",
     "versionSwitcher": {
         "versions": [">=1.x.x"],
         "excludeLevel": "patch"
     }
   },
   "opts": {
     "encoding": "utf8",
     "recurse": true,
     "package": "package.json",
     "tutorials": "demo/samples"
   }
 }
 ```

## Expose the HTML/JS code in example pages

If `script` or `div` elements have `code-js` or `code-html` class, expose their innerHTML.

1. innerHTML of `script.code-js` tag
2. innerHTML of `div.code-html` tag

**Example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>example</title>
</head>
<body>
    <div class="code-html">
        <h3> Base Example </h3>
        <p> Hello world </p>
    </div>

    <script class="code-js">
        console.log('hello world');
    </script>
</body>
</html>
```


## Development

1. Use `npm run serve` or `gulp serve` command to watch for changes and live reload browser.
3. API-Example tab, Auto-Complete and Resize functions are written in the `static/scripts/tui-doc.js` file.
