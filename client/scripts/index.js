var React = require('react'),
	Router = require('react-router');


	var App = React.createClass({
		getInitialState: function() {
			return {
				ingredients: []

			};
		},

		// componentDidMount: function(){
		// 	console.log('hi');
		// 	$.get('http://localhost:3000/food', function(data){
		// 		console.log(JSON.parse(data).recipes[0]);
		// 	})
		// },

		newIngredient: function(e) {
			if (e.charCode === 13){
				e.preventDefault();
				var currIngredients = this.state.ingredients;
				currIngredients.push(e.target.value);
				this.setState({ingredients:currIngredients});
			console.log(this.state.ingredients);
			}
		},

		render: function() {
			return (
				<div className="container">
				<Header />
				<PageNav ingredients ={this.state.ingredients} updateIngredients = {this.newIngredient}/>
				<Router.RouteHandler ingredients ={this.state.ingredients} updateIngredients = {this.newIngredient}/>
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
				<Router.Link to="home" ingredients ={this.props.ingredients}>Home</Router.Link>
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
