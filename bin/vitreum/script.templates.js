module.exports = {
	/**  Build Script **/
	build : ()=>{
		return `const label = 'build';
console.time(label);

const _ = require('lodash');
const steps = require('vitreum/steps');
const Proj = require('./project.js');

Promise.resolve()
	.then(() => steps.clean())
	.then(() => steps.libs(Proj.libs))
	.then(() => Promise.all(_.map(Proj.entryPoints, (path, name) => {
		return steps.jsx(name, path, {
			libs       : Proj.libs,
			shared     : Proj.shared,
			transforms : []
		})
		.then((deps) => steps.less(name, {shared: Proj.shared}, deps));
	})))
	.then(() => steps.assets(Proj.assets, Proj.shared))
	.then(() => console.timeEnd(label))
	.catch((err)=>console.error(err));`;
	},

	/**  Dev Script **/
	dev : ()=>{
		return `const label = 'dev';
console.time(label);

const _ = require('lodash');
const steps = require('vitreum/steps');
const Proj = require('./project.js');

Promise.resolve()
	.then(() => Promise.all(_.map(Proj.entryPoints, (path, name) => {
		return steps.jsxWatch(name, path, {
			libs       : Proj.libs,
			shared     : Proj.shared,
			transforms : []
		})
		.then((deps) => steps.lessWatch(name, {shared: Proj.shared}, deps));
	})))
	.then(() => steps.assetsWatch(Proj.assets, Proj.shared))
	.then(() => steps.livereload())
	.then(() => steps.serverWatch('./app.js', ['server']))
	.then(() => staticWatch())
	.then(() => console.timeEnd(label))
	.catch((err)=>console.error(err));`;
	},

	project : (libs=[])=>{
		return `module.exports = {
	entryPoints: {
		main : './client/main/main.jsx'
	},
	assetExts  : ['*.jpg', '*.png', '*.otf', '*.woff', '*.woff2', '*.ico', '*.ttf', '*.svg'],
	shared     : ['./client'],
	libs : ${JSON.stringify(libs, null, '\t')}
};`
	},
}