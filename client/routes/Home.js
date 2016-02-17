var React = require('react');
var request = require('request');


var Home = React.createClass({

	render: function() {
		console.log(this.props.data);
		var picArr = [];
		for (var recipe in this.props.data){
			// console.log(this.props.data[recipe].image);
			picArr.push(<img src={this.props.data[recipe].image} id={this.props.data[recipe].id} style={{ maxWidth: 250,  maxheight: 250}} />)
		}
		return (
			<div>
			<p>Home Page</p>
			{picArr}
			</div>
		);
	}

});

module.exports = Home;
