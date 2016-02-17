var React = require('react');
var request = require('request');



var Home = React.createClass({
	componentDidMount: function(){
		console.log('hi');
		$.get('http://localhost:3000/food', function(data){
			console.log(data);
		})
	},
	render: function() {
		return (
			<p>Home Page</p>
		);
	}

});

module.exports = Home;
