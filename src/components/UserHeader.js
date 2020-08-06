import React, { Component } from 'react'
import {connect} from 'react-redux';


 class UserHeader extends Component {

 
  render() {
    //  destructure user from props. The user object is passed to
    // props by the mapStateToProps function
    const {user} = this.props;
 
    if(!user){
      return null;
    }
    return (
      <div>
        {user.name}
        
      </div>
    )
  }
}

// mapstatetoprops can be used to filter out 
// unnesscary information. Some engineers put this function
// in a seperate file. Can extract any computation that needs to be done
// to the state in the mpastatetoprops funciton. 

// Here we are performing a computation to compare the id thats passed down to the userHeader as
// a prop to the users that are stored in the state.
const mapStateToProps = (state, owmProps) => {
  
  return {user: state.users.find((user) => user.id ===  owmProps.userId)}
}


export default connect(mapStateToProps)(UserHeader)