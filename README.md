# vitreum-cli
Global commandline tools for Vitreum projects


### install

```
npm install --global vitreum-cli
```

### use

#### `jsx [componentName]`

Creates a folder at your location of the component name, and a `.jsx` and `.less` file populated to be a functioning React component.


#### `vitreum`

Bootstraps a Vitreum project at the current location. Requires a `package.json` to be present. Creates the following:

- client folder and a starting component
- server folder with a built express server
- tasks needed to build the project
- add npm scripts to the package



## dev

1. Create a `/test` directory
1. run `npm link` in your project directory.
1. `cd test`
1. Test the above commands locally
