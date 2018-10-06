import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Landing from './routes/Landing'
import Home from './routes/Home'
import registerServiceWorker from './registerServiceWorker'
import {Router, Route} from 'react-router-dom'
import UserList from './routes/UserList'
import UserDetail from './routes/UserDetail'
import Callback from './routes/Callback'
import Auth from './config/auth'
import history from './history'

const auth = new Auth()

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

const SecuredRoute = (props) => {
  const {component: Component, path} = props;
  return (
    <Route path={path} render={(props) => {
        if (!auth.isAuthenticated()) {
          auth.login()
          return <div></div>
        }
        return <Component auth={auth} {...props} />
    }} />
  );
}

ReactDOM.render((
  <Router history={history}>
    <div>
      <Route exact path="/" component={Landing}/>
      <Route path="/home" render={props => <Home auth={auth} {...props} />} />
      <SecuredRoute path="/userlist" component={UserList}/>
      <SecuredRoute path="/user/:userId" component={UserDetail} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props)
        return <Callback {...props} /> 
      }}/>
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker()
