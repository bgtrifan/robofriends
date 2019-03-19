import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList'
import { robots } from '../Components/robots'
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'

import { setSearchField } from '../Actions.js'

const mapStateToProps = state => {
  return{
      searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {

  constructor(){
  	super()
  	this.state ={
  		robots: robots,
  	}
  }


  componentDidMount(){
    
  	fetch('http://jsonplaceholder.typicode.com/users')
  	.then(response => {
  		return response.json()
  	})
  	.then(users=>{
  		this.setState({robots: users})
  	})

  }

  render(){

    const { robots } = this.state;
    const { searchField, onSearchChange} = this.props;

  	const filteredRobots = this.state.robots.filter(robots => {
  		return robots.name.toLowerCase().includes(searchField.toLowerCase());
  	})
  	return (
		<div className ='tc'>
			<h1>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<CardList robots ={filteredRobots} />
			</Scroll>
		</div>
		);
  }
	
}

export default connect(mapStateToProps, mapDispatchToProps)(App)