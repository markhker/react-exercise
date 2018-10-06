import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import TopBar from '../components/TopBar'

export default class UserList extends Component {
  state = {
    users: null
  }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
  }

  async componentDidMount () {
    const users = (await axios.get('https://randomuser.me/api/?results=20&inc=name,email,phone,picture,id&seed=always')).data.results
    this.setState({
      users
    })
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div className="App">
        <TopBar isAuth={isAuthenticated()} login={this.login} logout={this.logout} />
        <div className="container">
          <div className="row">
            {this.state.users === null && <p>Loading users...</p>}
            {
              this.state.users && this.state.users.map((user, idx) => (
                <div key={idx} className="col-sm-12 col-md-4 col-lg-3">
                  <Link to={`/user/${user.email}`}>
                    <div className="card text-white bg-info mb-3">
                      <div className="card-body">
                        <h4 className="card-title text-capitalize">{user.name.first} {user.name.last}</h4>
                        <hr className="my-4" />
                        <h4 className="card-text">{user.email}</h4>
                        <p className="card-text">{user.phone}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

