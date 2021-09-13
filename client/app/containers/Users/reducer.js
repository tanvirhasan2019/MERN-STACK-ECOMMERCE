/*
 *
 * Users reducer
 *
 */

import { FETCH_USERS , DELETE_USERS } from './constants';

const initialState = {
  users: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };

    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter(item => item.email !== action.payload)
      };

    default:
      return state;
  }
};

export default usersReducer;
