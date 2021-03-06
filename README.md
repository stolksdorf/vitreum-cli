# vitreum-cli
Global commandline tools for Vitreum projects


## install

```
npm install --global vitreum-cli
```

## commands

### `jsx [-s || --smart] [-p || --pure] [componentName]`

Creates a folder at your location of the component name, and a `.jsx` and `.less` file populated to be a functioning React component.

If you specify `--pure` or `-p` it will instead create a [functional/pure component](https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components).

If you specify `--smart` or `-s` it will also create a [smart component](https://github.com/stolksdorf/pico-flux#example-smart-componentjsx) as well.


### `vitreum`

Bootstraps a Vitreum project at the current location. Requires a `package.json` to be present. Creates the following:

- add npm scripts to the package
- Creates the following project structure.

```
/myProj
├─ /build/...
├─ /node_modules/...
├─ .eslintrc.js
├─ .gitignore
├─ .gitattributes
├─ app.js
├─ /client
|   ├─ /shared
|   |  └─ /components.js
|   |  └─ /widget/...
|   └─ /main
|      ├─ main.jsx
|      └─ main.less
|      └─ /pages/...
├─ /config
|   ├─ default.json
|   └─ local.json
├─ /scripts
|   ├─ build.script.js
|   ├─ dev.script.js
|   └─ project.js
└─ /server
   ├─ server.js
   ├─ page.template.js
   └─ page.router.js
```


# dev
To work on this, follow the steps.

1. clone it
1. run `npm link` in your project directory.
1. `npm run test`
