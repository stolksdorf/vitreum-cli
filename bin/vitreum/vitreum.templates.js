const fs = require('fs');

module.exports = {
	scripts : require('./script.templates.js'),
	eslint : ()=>fs.readFileSync('./eslint.template.js', 'utf8'),



/** Server **/

	server : ()=>{
		return `const config = require('nconf');
const express = require('express');
const app     = express();
app.use(require('cookie-parser')());
app.use(express.static('./build'));
app.enable('trust proxy');

app.use(require('./basic.router.js'));

const render = require('vitreum/steps/render');
const pageTemplate = require('./page.template.js');
app.get('*', (req, res) => {
	render('main', pageTemplate, {
			url    : req.url,
			config : config.get('client')
		})
		.then((page) => res.send(page))
		.catch((err) => console.log(err));
});

module.exports = app;
`;
	},

	app : ()=>{
		return `const config = require('nconf')
	.env({lowerCase: true, seperator: '.'})
	.argv()
	.file('environment', {file: \`config/\${process.env.NODE_ENV}.json\`})
	.file('defaults', {file: 'config/default.json'});

const server = require('./server/server.js');

const PORT = config.get('port');
server.listen(PORT, () => {
	console.log(\`server on port:\${PORT}\`);
});`

	},

	router: ()=>{

	}

/** Template **/
	template : ()=>{
		return `module.exports = (vitreum)=>{
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






/**  Test **/
	test : ()=>{
		return `const test = require('ava');

test('My first test', (t)=>{
	t.pass();
});

`;
},




}