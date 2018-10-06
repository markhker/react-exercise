import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Button from './Button'
import icon from '../assets/favicon-196x196.png'

export default class TopBar extends Component {
  getUserImage = () => {
    return localStorage.getItem('user_image')
  }

  render() {
    return (
      <header style={{
        height:          48,
        width:           '100%',
        backgroundColor: 'rgb(102,63,180)',
        color:           'white',
        padding:         '6px 10px',
        display:         'flex',
        flexDirection:   'row',
        alignItems:      'center'
      }}
      >
        <div style={styles.logo}>
          <Link to="/">
            <img alt={'logo'} style={{ maxHeight: 40, flex: 1}} src={icon} />
          </Link>
        </div>
        <div>
          {'Modus Create'}
        </div>
        <div style={{float: 'left', color: 'white', flex: 1}} />
        <div style={{float: 'right', paddingRight: 20}}>
          {
            !this.props.isAuth && (
              <Button style={{backgroundColor: 'blue', color: 'white'}} onClick={this.props.login}>Log In</Button>
            )
          }
          {
            this.props.isAuth && (
              <React.Fragment>
                <img alt={'user'} style={{ maxHeight: 40, flex: 1, borderRadius: '50%'}} src={this.getUserImage()} />
                <Button style={{backgroundColor: 'blue', color: 'white'}} onClick={this.props.logout}>Log Out</Button>
              </React.Fragment>
            )
          }
        </div>
      </header>
    )
  } 
}

const styles = {
  logo: {
    float:  'left',
    margin: 8
  }
}

