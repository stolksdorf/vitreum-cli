#!/usr/bin/env node

const path = require('path');
const fs   = require('fs');
const mkdirp = require('mkdirp');
const templates = require('./jsx.templates.js')

const location = process.cwd();

const componentName = process.argv[2];
if(!componentName){
	throw 'Error: You must provide a component name. eg. jsx myComp';
}

componentName = _.camelCase(componentName);
mkdirp(path.join(location, componentName), function(err) {
	if(err){
		console.log('Error : There was an error creating the component folder'.red);
		return;
	}
	fs.writeFileSync(
		path.join(location, componentName, `${componentName}.jsx`),
		templates.jsx(componentName));
	fs.writeFileSync(
		path.join(location, componentName, `${componentName}.less`),
		templates.less(componentName));
});

