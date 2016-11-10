# TUI JSDoc Template
Toast UI JSDoc template

Demo: https://nhnent.github.io/tui.jsdoc-template/latest/

## install
```
npm i -D tui-jsdoc-template
```

## Feature
TUI JSDoc template has following features.

* Navigation - AutoComplete Searchbox
* Navigation - Members / Methods / Events
* Navigation - API / Examples(Tutorials) Tab
* Navigation - Resize
* Examples - HTML/JS source tab in example page

![Example](https://cloud.githubusercontent.com/assets/12269563/20049432/69d2ed42-a506-11e6-980e-53b991e5ee5b.png)

## Configuration
([*jsdoc page - configuration*](http://usejsdoc.org/about-configuring-jsdoc.html#incorporating-command-line-options-into-the-configuration-file))

### Template
```
"opts": {
    "template": "node_modules/tui-jsdoc-template"
}
```

### Logo Image
```
"templates": {
    "logo": {
        "url": "http://nhnent.github.io/tui.component.tree/latest/styles/logo.png",
        "width": "150px",
        "height": "13px"
    }
}
```

### Page Title
```
"templates": {
    "name": "Tui JSDoc Template"
}
```

### FooterText
```
"templates": {
    "footerText": "blabla..."
}
```

<br>
## Expose the html/js code to exmaple page
If `script` or `div` elements have `code-js` or `code-html` class, expose their innerHTML.

1. innerHTML of `script.code-js` tag
2. innerHTML of `div.code-html` tag

```
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

<br>
## Development
1. Use `npm run serve` or `gulp serve` command to ascertain realtime.
3. Api-Example tab, Auto-Complete and Resize functions are written in the `static/scripts/tui-doc.js` file.
