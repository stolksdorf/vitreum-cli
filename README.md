# vitreum-cli
Global commandline tools for Vitreum projects


## install

```
npm install --global vitreum-cli
```

## commands

### `jsx [componentName]`

Creates a folder at your location of the component name, and a `.jsx` and `.less` file populated to be a functioning React component.


### `vitreum`

Bootstraps a Vitreum project at the current location. Requires a `package.json` to be present. Creates the following:

- add npm scripts to the package
- Creates the following project structure.

```
/myProj
├─ /build/...
├─ /node_modules/...
├─ /client
|   ├─ template.js
|   └─ /main
|      ├─ main.jsx
|      └─ main.less
├─ /config
|   ├─ default.json
|   └─ local.json
├─ /scripts
|   ├─ build.js
|   ├─ dev.js
|   └─ project.json
├─ /shared
|   └─ /myProj/...
├─ /server
|   └─ routes.js
└─ server.js
```





# dev
To work on this, follow the steps.

1. clone it
1. Create a `/test` directory within the project
1. run `npm link` in your project directory.
1. `cd test`
1. Test the above commands locally
