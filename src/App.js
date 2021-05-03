import React from 'react';
import AppContainer from './AppContainer'
import { Provider } from 'react-redux';
import Login from './components/auth/login'
import { setToken, checkTokenValidity} from './components/auth/auth'
import Header from './components/header'
import Top3 from './components/top3'
import _ from 'lodash'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
 
import store from './store'

class App extends React.Component {

  state = { isTokenValid: false}

  async componentDidMount(){
      const response = await  checkTokenValidity()
      this.setState({ isTokenValid: response })
  }

  render() {

  if(!this.state.isTokenValid)
      return <Login setToken={setToken} />

  return(
    <Router>
    <Provider store={store}>
      <Header/>
      <Switch>
        <Route exact path="/" component={AppContainer} />
        <Route exact path="/top3" component={Top3} />
      </Switch>
    </Provider>
    </Router>
  ) 
  }
}
export default App;