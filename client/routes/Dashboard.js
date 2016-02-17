var React = require('react');
var request = require('request');


var Dashboard = React.createClass({
  getInitialState: function() {
		return {
      ingredients: []

		};
	},

  componentDidMount: function(){
    // get stuff from server for user

  },
	newIngredient: function(e) {
    console.log(request);
    if (e.charCode === 13){
      e.preventDefault();
      var currIngredients = this.state.ingredients;
      currIngredients.push(e.target.value);
      this.setState({ingredients:currIngredients});
    console.log(this.state.ingredients);
    }
	},

	render: function() {
    var ingredientsArr =[];
    for (var i = 0; i < this.state.ingredients.length; i++){
      ingredientsArr.push(<li>{this.state.ingredients[i]}</li>);
    }
		return (
      <div>
      <form  >
        Whats new in your kitchen?<br/>
          <input type="text"  name = "newIngredient" onKeyPress={this.newIngredient}/>
      </form>
      <ul>{ingredientsArr}</ul>
      </div>


		);
	}
});

module.exports = Dashboard;
