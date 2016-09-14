"use strict";

var React = require('react');
var Router = require('react-router');
var Routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(Routes, function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});
