import axios from 'axios';
import authSlice from '../slices/authSlice';
import mainSlice from '../slices/mainSlice';

export const {
  loginHandler,
  setTokenHandler,
  loginCheckStatusHandler,
  logoutHandler,
  authErrorHandler,
} = authSlice.actions;

export const { addTasks, mainErrorHandler, showCalendarHandler } = mainSlice.actions;

// тут заменить на запрос к firebase
export const signInFetch = someData => {
  return dispatch => {
    axios
      .post(`api/auth/sign`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: someData,
      })
      .then(res => {
        if (res.status === 201) {
          console.log('sign in successed');
        }
      })
      .catch(err => dispatch(authErrorHandler(err.response.data.message)));
  };
};

// тут заменить на запрос к firebase

export const loginFetch = someData => {
  return dispatch => {
    axios
      .post(`api/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: someData,
      })
      .then(res => {
        if (res.status === 201) {
          dispatch(loginHandler(res.data.user));
          dispatch(setTokenHandler(res.data.token));
        }
      })
      .catch(err => dispatch(authErrorHandler(err.response.data.message)));
  };
};

export const fetchTasks = number => {
  // заменить тут на бд
  return dispatch => {
    let pageNumber = number ? number : 0;
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${pageNumber + 1}`)
      .then(response => {
        // dispatch(setTotalPageAmount(response.data.info.pages));
        dispatch(
          addTasks(
            response.data.results.map(character => ({
              //   name: character.name,
              //   id: character.id,
              //   image: character.image,
              //   gender: character.gender,
              //   species: character.species,
              //   status: character.status,
              //   location: character.location,
              //   origin: character.origin,
            })),
          ),
        );
      })
      .catch(err => dispatch(mainErrorHandler(err.response.data.message)));
  };
};

// export const showUserInfoHandler = (token, userId) => {
//     return dispatch => {
//       axios
//         .get('api/userInfo', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + token,
//           },
//         })
//         .then(response => dispatch(showUserInfo(response.data.user)))
//         .catch(err => dispatch(mainErrorHandler(err.response.data.message)));
//     };
