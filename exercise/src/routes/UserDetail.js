import React, { Component } from 'react'
import axios from 'axios'

import TopBar from '../components/TopBar'

export default class UserDetail extends Component {
  state = {
    user: null
  }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
  }

  async componentDidMount() {
    const { match: { params } } = this.props
    const users = (await axios.get('https://randomuser.me/api/?results=20&inc=name,email,phone,picture,id&seed=always')).data.results
    const user = {...users.filter(user => user.email === params.userId)[0]}
    this.setState({
      user
    })
  }

  render() {
    const {user} = this.state
    const { isAuthenticated } = this.props.auth
    if (user === null) return <p>Loading ...</p>
    return (
      <div className="App">
        <TopBar isAuth={isAuthenticated()} login={this.login} logout={this.logout} />
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12 text-center">
              <img src={user.picture.large} className="rounded" alt={user.email} />
              <h3 className="display-4 text-capitalize">{user.name.first} {user.name.last}</h3>
              <hr className="my-4" />
              <p className="lead">Email: {user.email}</p>
              <p className="lead">Phone: {user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

