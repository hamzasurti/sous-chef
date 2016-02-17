var React = require('react'),
	Router = require('react-router');


	var App = React.createClass({
		getInitialState: function() {
			return {
				ingredients: ["apple"],
				data:{}
			};
		},
//create params for an ajax request that gets read by server
		getFood: function(){
			var url = 'http://localhost:3000/food';
			for (var i = 0; i < this.state.ingredients.length; i++) {
				url = url + this.state.ingredients[i] + '%2C'
			}
			url = url + '&limitLicense=false&number=20&ranking=1'
			$.get(url, function(data){
				data = JSON.parse(data);
				this.state.data = data;
				console.log(this.state.data);
			}.bind(this))
		},

		componentDidMount: function(){
			this.getFood();
		},

//on enter press create new ingredient in dashboard and update state accordingly
		newIngredient: function(e) {
			if (e.charCode === 13){
				e.preventDefault();
				var currIngredients = this.state.ingredients;
				currIngredients.push(e.target.value);
				this.setState({ingredients:currIngredients});
				this.getFood();
			}
		},

		render: function() {
			return (
				<div className="container">
				<Header />
				<PageNav data = {this.state.data} ingredients ={this.state.ingredients} updateIngredients = {this.newIngredient}/>
				<Router.RouteHandler data = {this.state.data} ingredients ={this.state.ingredients} updateIngredients = {this.newIngredient}/>
				</div>
			);
		}
	});





var Header = React.createClass({
	render: function() {
		return (
			<div className="page-header">
				<h1>Sous Chef</h1>
			</div>
		);
	}
});

var PageNav = React.createClass({

	render: function() {
		// console.log(this.props.ingredients);
		return (
			<div className="nav">
				<Router.Link to="home" data = {this.props.data} ingredients ={this.props.ingredients}>Home</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="about">About</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="dashboard" ingredients ={this.props.ingredients} updateIngredients = {this.props.updateIngredients}>Dashboard</Router.Link>
			</div>
		);
	}
});


var routes = {
	Home: require('../routes/Home'),
	About: require('../routes/About'),
	Dashboard: require('../routes/Dashboard')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home} />
		<Router.Route name="about" path="/about" handler={routes.About}/>
		<Router.Route name="dashboard" path="/dashboard" handler={routes.Dashboard}/>
		<Router.DefaultRoute handler={routes.Home}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
