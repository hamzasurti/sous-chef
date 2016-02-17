var React = require('react');
var request = require('request');


var Dashboard = React.createClass({

	render: function() {
    var ingredientsArr =[];
    for (var i = 0; i < this.props.ingredients.length; i++){
      ingredientsArr.push(<li>{this.props.ingredients[i]}</li>);
    }
		return (
      <div>
      <form className="form-group" >
        Whats new in your kitchen?<br/>
          <input type="text"  name = "newIngredient" onKeyPress={this.props.updateIngredients} className="form-control"/>
      </form>
      <ul>{ingredientsArr}</ul>
      </div>


		);
	}
});

module.exports = Dashboard;
