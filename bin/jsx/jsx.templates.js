const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	jsx : (name) => {
		const Name = capitalize(name);
		return `const React       = require('react');
const createClass = require('create-react-class');
const _           = require('lodash');


const ${Name} = createClass({
	getDefaultProps : function(){
		return {

		};
	},
	render : function(){
		return <div className='${name}'>
			${Name} Component Ready.
		</div>;
	}
});

module.exports = ${Name};
`;
	},
	pure : (name) => {
			const Name = capitalize(name);
			return `const React = require('react');
const _     = require('lodash');


module.exports = (props)=>{
	props = _.defaults(props, {

	});

	return <div className='${name}'>
		${Name} Pure Component Ready.
	</div>;
};
`;
	},
	less : (name) => {
		return `.${name}{\n\n}`;
	},
	smart : (name) => {
		const Name = capitalize(name);
		return `const Store = require('store.js');
const ${Name} = require('./${name}.jsx');

module.exports = Store.createSmartComponent(${Name}, (props)=>{
	return {

	};
});
`;
	},
};