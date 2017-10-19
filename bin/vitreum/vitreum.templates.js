
module.exports = {
	scripts : require('./script.templates.js'),
	eslint : ()=>require('./eslint.template.js'),
	server : require('./server.templates.js'),
	client : require('./client.templates.js'),


/**  Test **/
	test : ()=>{
		return `const test = require('tape');

test('My first test', (t)=>{
	t.equals(2+2, 4);

	t.end();
});

`;
	},


}