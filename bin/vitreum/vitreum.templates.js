
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

	testReact : ()=>{
		return `const React  = require('react');
const test   = require('tape');
const render = (comp) => require('react-test-renderer').create(comp).toJSON();

test('renders the button', (t) => {
	const btn = render(<button className='test' />);
	t.equals(btn.type, 'button');
	t.equals(btn.props.className, 'test');
	t.end();
});`;
	}


}