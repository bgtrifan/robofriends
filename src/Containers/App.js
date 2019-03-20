import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList'
import { robots } from '../Components/robots'
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'

import { setSearchField, requestRobots } from '../Actions.js'

const mapStateToProps = state => {
  return{
      searchField: state.searchRobots.searchField,
      robots: state.requestRobots.robots,
      isPending: state.requestRobots.isPending,
      error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  // constructor(){
  // 	super()
  // 	this.state ={
  // 		robots: robots,
  // 	}
  //}


  componentDidMount(){
    
  	// fetch('http://jsonplaceholder.typicode.com/users')
  	// .then(response => {
  	// 	return response.json()
  	// })
  	// .then(users=>{
  	// 	this.setState({robots: users})
  	// })

    this.props.onRequestRobots()

  }

  render(){

    // const { robots } = this.state;
    const { searchField, onSearchChange, robots, isPending} = this.props;

  	const filteredRobots = this.props.robots.filter(robots => {
  		return robots.name.toLowerCase().includes(searchField.toLowerCase());
  	})
  	return !isPending ? 
      <h1>Loading</h1> :
    (
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