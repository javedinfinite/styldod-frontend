import React from 'react';
import {Loader,Grid, Pagination} from 'semantic-ui-react';
import {  getUsersCount, getSomeUsers} from './actions/hackerAction';
import Dataset from './components/dataset'
import { connect } from 'react-redux';
import './App.css'
import _ from 'lodash'

import Login from './components/auth/login'
import {setToken, checkTokenValidity} from './components/auth/auth'

class AppContainer extends React.Component {
  state = {
    activePage: 1,
    data:[],
    offset: 5,
    tcount: 10,
    isTokenValid:true
  }
  
  componentDidMount() {
 
    if(_.isEmpty(this.props.totalUsersCount)  )
      this.setState({isTokenValid:checkTokenValidity()})
      this.props.dispatch(getUsersCount());
  }

  handlePaginationChange = (e, { activePage }) => {
 
    this.props.dispatch(getSomeUsers(activePage));
    this.setState({isTokenValid:checkTokenValidity()})

}
  render() {

    const { error, isLoading, totalUsersCount} = this.props;
    
    if (error) {
        return <div> Error: {error} </div>;
    } else if (isLoading) {
        return <Loader size="large" indeterminate active />
      }
      else if(!this.state.isTokenValid)
          return <Login setToken={setToken} />
    else {

      if(_.isEmpty(this.props.totalUsersCount)  )
        return null;
  
      return (
          
        <Grid celled='internally'>
            <Grid.Row style={{ height : '82vh' , overflow: 'auto'}} >
                  <Dataset page_number={this.state.activePage} />
            </Grid.Row>
            <Grid.Row>
              <Pagination inverted color={'teal'}
                        defaultActivePage = "1"
                        onPageChange = {this.handlePaginationChange}
                        totalPages= {Math.ceil(totalUsersCount/10)}
                      />
            </Grid.Row>
          </Grid>
      )
    }
  }
}
const mapStateToProps = (state, props) => {
  return {
    totalUsersCount: state.hackerReducers.totalUsersCount,
    error:  state.hackerReducers.error,
    isLoading: false
  };
};

export default connect(mapStateToProps)(AppContainer);