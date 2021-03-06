import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { action } from 'app/redux/Store'
import MyPage from 'app/pages/MyPage'
import UserAction from 'app/redux/actions/UserAction'

class App extends React.Component {

  render () {
      const { users, searchName, isLoading } = this.props
      if (isLoading) {
        return (<h2>Loading</h2>)
      } else {
        return (
          <Fragment>
            <MyPage searchName={searchName} onChange={this.onChange} onClick={this.onClick} />
            <div>
              { users.map(function(user, index){
                return <p key={index}>{user.getAttribute('name')}</p>
              })}
            </div>
          </Fragment>
        )
      }
  }
  onClick = (e) => {
    action(UserAction.USER_GET, this.props.searchName)
  }
  onChange = (e) => {
    action(UserAction.SEARCH_NAME_CHANGED, e.target.value)
  }
}

App.propTypes = {
  users: PropTypes.array.isRequired,
  searchName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default connect(store => ({
  users: store.user.users,
  searchName: store.user.searchName,
  isLoading: store.user.isLoading,
}))(App)
