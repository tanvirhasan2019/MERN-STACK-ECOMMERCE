/*
 *
 * Users
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import UserList from '../../components/Manager/UserList';
import UserSearch from '../../components/Manager/UserSearch';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Users extends React.PureComponent {
  render() {
    const { users, searchUsers , user_mail_selection } = this.props;

    return (
      <div className='users-dashboard'>
        <SubPage title='Users' />
        <UserSearch onSearchSubmit={searchUsers} />
        {users.length > 0 ? (
          <UserList users={users} user_mail_selection={user_mail_selection} />
        ) : (
          <NotFound message='No Users Found!' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps, actions)(Users);
