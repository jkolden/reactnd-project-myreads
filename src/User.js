import React, {Component} from 'react'

class User extends React.Component{

  state = {
    username: 'Mariah'
  }


render() {

  return (
    <div>
      <p>Username: {this.state.username}</p>
      <p>Is Friend?: {this.props.friend}</p>
      <p>Status: {this.props.status}</p>

    </div>
  )
}

}

export default User
