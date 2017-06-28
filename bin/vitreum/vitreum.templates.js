
module.exports = {


/* ---- SERVER ---- */

	server : ()=>{
		return `
const _ = require('lodash');
const config = require('nconf');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/build'));

config.argv()
	.env({ lowerCase: true })
	.file('environment', { file: \`config/\${process.env.NODE_ENV}.json\` })
	.file('defaults', { file: 'config/default.json' });

const templateFn = require('./server/page.template.js');
const render = require('vitreum/steps/render');

app.get('*', (req, res)=>{
	render('main', templateFn, {
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

	/* ---- TEMPLATE ---- */
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



	/* ----- BUILD SCRIPT ---- */
	buildScript : ()=>{
		return `
const label = 'build';
console.time(label);

const steps = require('vitreum/steps');
const Proj = require('./project.json');

Promise.resolve()
	.then(()=>steps.clean())
	.then(()=>steps.lib(Proj.libs))
	.then(()=>steps.jsx('main', './client/main/main.jsx', Proj.libs))
	.then((deps)=>steps.less('main', [], deps))
	.then(()=>steps.asset(Proj.assets, ['./client']))
	.then(()=>console.timeEnd(label))
	.catch((err)=>console.error(err));`;
	},

	/* ----- DEV SCRIPT ---- */
	devScript : ()=>{
		return `
const label = 'dev';
console.time(label);
const steps = require('vitreum/steps');

const Proj = require('./project.json');

Promise.resolve()
	.then(()=>steps.jsxWatch('main', './client/main/main.jsx', Proj.libs))
	.then((deps)=>steps.lessWatch('main', [], deps))
	.then(()=>steps.assetsWatch(Proj.assets, ['./client']))
	.then(()=>steps.livereload())
	.then(()=>steps.serverWatch('./server.js', ['server']))
	.then(()=>console.timeEnd(label))
	.catch((err)=>console.error(err));`;
	},


}