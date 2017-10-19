module.exports = {

	server : ()=>{
		return `const express = require('express');
const app     = express();

app.use(express.static('./build'));
app.enable('trust proxy');

app.use(require('./page.router.js'));

app.all('*', (req, res) => {
	res.status(404).send('Oh no.');
});

module.exports = app;
`;
	},

	app : ()=>{
		return `const config = require('nconf')
	.env({lowerCase: true, separator: '.'})
	.argv()
	.file('environment', {file: \`config/\${process.env.NODE_ENV}.json\`})
	.file('defaults', {file: 'config/default.json'});

const server = require('./server/server.js');

const PORT = config.get('port');
server.listen(PORT, () => {
	console.log(\`server on port:\${PORT}\`);
});`

	},

	pageRouter: ()=>{
		return `const config = require('nconf');
const router = require('express').Router();
const render = require('vitreum/steps/render');
const pageTemplate = require('./page.template.js');

router.get('*', (req, res) => {
	render('main', pageTemplate, {
		url    : req.url,
		config : config.get('client')
	})
	.then((page) => res.send(page))
	.catch((err) => console.log(err));
};

module.exports = router;`
	},

	pageTemplate : (projName='')=>{
		return `module.exports = (vitreum)=>{
	return \`<!-- Doctype HTML5 -->
<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>

	<link href='//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css' />

	<title>${projName}</title>
	<link rel='icon' type='image/png' href='/assets/favicon.png' />
	\${vitreum.head}
</head>
<body>
	<main id='reactRoot'>\${vitreum.body}</main>
</body>
\${vitreum.js}
</html>\`;
};`;
	},




}