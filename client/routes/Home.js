var React = require('react');
var request = require('request');


var Home = React.createClass({

	render: function() {
		console.log(this.props.ingredients);
		return (
			<p>Home Page</p>
		);
	}

});

module.exports = Home;
