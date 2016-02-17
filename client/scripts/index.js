var React = require('react'),
	Router = require('react-router');

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
		return (
			<div className="nav">
				<Router.Link to="home">Home</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="about">About</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="dashboard">Dashboard</Router.Link>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />
				<PageNav />
				<Router.RouteHandler/>
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
		<Router.Route name="home" path="/" handler={routes.Home}/>
		<Router.Route name="about" path="/about" handler={routes.About}/>
		<Router.Route name="dashboard" path="/dashboard" handler={routes.Dashboard}/>
		<Router.DefaultRoute handler={routes.Home}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
