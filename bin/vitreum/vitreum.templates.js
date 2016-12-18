
module.exports = {


/* ---- SERVER ---- */

	server : () => {
		return `
const _ = require('lodash');
const config = require('nconf');
const express = require("express");
const app = express();
app.use(express.static(__dirname + '/build'));

config.argv()
	.env({ lowerCase: true })
	.file('environment', { file: \`config/\${process.env.NODE_ENV}.json\` })
	.file('defaults', { file: 'config/default.json' });

const templateFn = require('./client/template.js');
const render = require('vitreum/steps/render');

app.get('*', (req, res) => {
	render('main', templateFn, {
			url : req.url
		})
		.then((page) => {
			return res.send(page);
		})
		.catch((err) => {
			console.log(err);
		});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log(\`server on port:\${PORT}\`);
`;
	},

	/* ---- TEMPLATE ---- */
	template : () => {
		return `
module.exports = (vitreum) => {
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



	/* ----- BUILD SCRIPT ---- */
	buildScript : () => {
		return `
const label = 'build';
console.time(label);

const clean = require('vitreum/steps/clean').partial;
const jsx = require('vitreum/steps/jsx').partial;
const lib = require('vitreum/steps/libs').partial;
const less = require('vitreum/steps/less').partial;
const asset = require('vitreum/steps/assets').partial;

const Proj = require('./project.json');

Promise.resolve()
	.then(clean())
	.then(lib(Proj.libs))
	.then(jsx('main', './client/main/main.jsx', Proj.libs, ['./shared']))
	.then(less('main', ['./shared']))
	.then(asset(Proj.assets, ['./shared', './client']))
	.then(console.timeEnd.bind(console, label))
	.catch(console.error);`;
	},

	/* ----- DEV SCRIPT ---- */
	devScript : () => {
		return `
const label = 'dev';
console.time(label);

const jsx = require('vitreum/steps/jsx.watch').partial;
const less = require('vitreum/steps/less.watch').partial;
const assets = require('vitreum/steps/assets.watch').partial;
const server = require('vitreum/steps/server.watch').partial;
const livereload = require('vitreum/steps/livereload').partial;

const Proj = require('./project.json');

Promise.resolve()
	.then(jsx('main', './client/main/main.jsx', Proj.libs, ['./shared']))
	.then(less('main', ['./shared']))
	.then(assets(Proj.assets, ['./shared', './client']))
	.then(livereload())
	.then(server('./server.js', ['server']))
	.then(()=> { console.timeEnd(label) })
	.catch(console.error)`;
	},


}