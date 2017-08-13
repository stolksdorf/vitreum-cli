
module.exports = {

/** Server **/

	server : ()=>{
		return `const _       = require('lodash');
const config  = require('nconf');
const express = require('express');
const app     = express();
app.use(express.static(\`\${__dirname}/build\`));

config.argv()
	.env({lowerCase: true})
	.file('environment', {file: \`config/\${process.env.NODE_ENV}.json\`})
	.file('defaults', {file: 'config/default.json'});

const pageTemplate = require('./page.template.js');
const render = require('vitreum/steps/render');

app.get('*', (req, res)=>{
	render('main', pageTemplate, {
		url : req.url
	})
		.then((page)=>res.send(page))
		.catch((err)=>console.log(err));
});

const PORT = config.get('port');
app.listen(PORT);
console.log(\`server on port:\${PORT}\`);
`;
	},

/** Template **/
	template : ()=>{
		return `
module.exports = (vitreum)=>{
	return \`<html>
	<head>
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
		<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />

		\${vitreum.head}
	</head>
	<body>
		<main id="reactRoot">\${vitreum.body}</main>
	</body>
	\${vitreum.js}
</html>\`;
};`;
	},



/**  Build Script **/
	buildScript : ()=>{
		return `
const label = 'build';
console.time(label);

const _     = require('lodash');
const steps = require('vitreum/steps');
const Proj  = require('./project.json');
const {libs, shared} = Proj;

Promise.resolve()
	.then(()=>steps.clean())
	.then(()=>steps.libs(Proj.libs))
	.then(()=>Promise.all(_.map(Proj.entryPoints, (path, name)=>{
		return steps.jsx(name, path, {libs, shared})
			.then((deps)=>steps.less(name, {shared}, deps));
	})))
	.then(()=>steps.assets(Proj.assets, shared))
	.then(()=>console.timeEnd(label))
	.catch((err)=>console.error(err));`;
	},

/**  Dev Script **/
	devScript : ()=>{
		return `
const label = 'dev';
console.time(label);

const _     = require('lodash');
const steps = require('vitreum/steps');
const Proj  = require('./project.json');
const {libs, shared} = Proj;

Promise.resolve()
	.then(()=>Promise.all(_.map(Proj.entryPoints, (path, name)=>{
		return steps.jsxWatch(name, path, {libs, shared})
			.then((deps)=>steps.lessWatch(name, {shared}, deps));
	})))
	.then(()=>steps.assetsWatch(Proj.assets, shared))
	.then(()=>steps.livereload())
	.then(()=>steps.serverWatch('./server/server.js', ['server']))
	.then(()=>console.timeEnd(label))
	.catch((err)=>console.error(err));`;
	},


/**  Test **/
	test : ()=>{
		return `const test = require('ava');

test('My first test', (t)=>{
	t.pass();
});

`;
},

/**  ESlint **/
	eslint : ()=>{
		return `
{
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "script",
		"ecmaFeatures": {
			"jsx": true,
			"experimentalObjectRestSpread": true
		}
	},
	"plugins": ["react"],
	"rules" : {
		/** Errors **/
		"no-new-object": "error",
		"no-array-constructor": "error",
		"no-iterator": "error",
		"no-proto": "error",
		"no-nested-ternary": "error",
		"func-style": ["error", "expression", {"allowArrowFunctions": true}],
		"camelcase": ["error", {"properties": "never"}],
		"react/prefer-es6-class": ["error", "never"],
		"react/jsx-no-bind" : ["error", {"allowArrowFunctions" : true}],

		/** Warnings **/
		"no-restricted-syntax": ["warn", "ClassDeclaration", "SwitchStatement"],
		"max-lines" : ["warn", {"max": 250, "skipComments": true, "skipBlankLines": true}],
		"max-params" : ["warn", {"max": 4}],

		/** Fixable **/
		"quotes": ["warn", "single"],
		"prefer-template": "warn",
		"arrow-parens": ["warn", "always"],
		"no-var": "warn",
		"prefer-const": "warn",
		"semi": ["warn", "always"],
		"indent": ["warn", "tab"],
		"linebreak-style": ["warn", "unix"],
		"jsx-quotes": ["warn", "prefer-single"],

		/** Whitespace **/
		"template-curly-spacing": ["warn", "never"],
		"arrow-spacing": ["warn", { "before": false, "after": false }],
		"space-in-parens": ["warn", "never"],
		"no-trailing-spaces": "warn",
		"object-curly-spacing": ["warn", "never"],
		"space-before-blocks": ["warn", "never"],
		"no-whitespace-before-property": "warn",
		"space-in-parens": ["warn", "never"],
		"comma-spacing": ["warn", {"before": false, "after": true}],
		"object-curly-spacing": ["warn", "never"],
		"keyword-spacing": ["warn", {
			"before": false, "after": false,
			"overrides" : {
				"return" : { "before" : true, "after" : true }
			}
		}],
		"key-spacing": ["warn", {
			"multiLine": {
				"beforeColon": true,
				"afterColon": true,
				"align": "colon"
			}
		}]
	}
}`;
	},


}