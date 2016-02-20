import { createAction, handleActions } from 'redux-actions';
import { fetch } from '../../utils';
import { API_URL } from '../../backend_url';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN';

// ------------------------------------
// Actions
// ------------------------------------
export const saveToken = createAction(LOGIN, json => {
  window.localStorage.OneLoveAuthToken = json.token;
  return json;
});

export const login = (email, password) => {
  return dispatch => {
    fetch({
      url: `${API_URL}/auth/tokens`,
      body: {
        email,
        password,
      },
      contentType: 'application/json',
      method: 'post',
    })
      .then(json => {
        dispatch(saveToken(json));
        return json;
      })
      .catch(error => {
        console.log('in catch', error);
      });
  };
};

export const actions = {
  saveToken,
  login,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  LOGIN: (state, { payload }) => {
    return payload;
  },
}, { loggedIn: false });
