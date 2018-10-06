import React, { Component } from 'react';

import TopBar from '../components/TopBar';
import HomeContent from '../components/HomeContent';

export default class Home extends Component {
  goTo = (route) => {
    this.props.history.replace(`/${route}`)
  }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout()
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div className="App">
        <TopBar isAuth={isAuthenticated()} login={this.login} logout={this.logout} />
        <HomeContent goTo={this.goTo} isAuth={isAuthenticated()} login={this.login} logout={this.logout} />
      </div>
    );
  }
}

