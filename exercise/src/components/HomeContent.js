import React, {Component} from 'react';
import Button from './Button';
export default class HomeContent extends Component {
  render() {
    return (
      <div>
        {
            !this.props.isAuth && (
              <Button onClick={this.props.login}>Log In</Button>
            )
          }
          {
            this.props.isAuth &&
              <React.Fragment>
                <Button onClick={this.props.logout}>Log Out</Button>
                <Button onClick={() => this.props.goTo('userlist')}>User List</Button>
              </React.Fragment>
          }
      </div>
    );
  }
}
