const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	jsx : (name) => {
		const Name = capitalize(name);
		return `
const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const ${Name} = React.createClass({
	getDefaultProps: function() {
		return {

		};
	},
	render: function(){
		return <div className='${name}'>
			${Name} Component Ready.
		</div>
	}
});

module.exports = ${Name};
`;
	},
	less : (name) => {
		return `.${name}{\n\n}`;
	}
}