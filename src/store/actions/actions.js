import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import authSlice from '../slices/authSlice';
import mainSlice from '../slices/mainSlice';

export const {
  loginHandler,
  setTokenHandler,
  loginCheckStatusHandler,
  logoutHandler,
  authErrorHandler,
} = authSlice.actions;

export const {
  addTasks,
  addNewTaskHandler,
  taskIsDoneHandler,
  mainErrorHandler,
  showCalendarHandler,
} = mainSlice.actions;

// тут заменить на запрос к firebase
export const signInFetch = someData => {
  console.log('sign in ', someData);
  const { email, password } = someData;
  console.log('email', email);
  return dispatch => {
    axios
      .post(
        // `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/`,
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7YzopdkUjZuPqIP6V3K2kUkBt6SqiUng`,
        JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log('lflflflfl');
        if (res.status === 200) {
          console.log('sign in successed');
        }
        return res;
      })
      .then(res => {
        console.log(res);
        axios.post(
          `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
          JSON.stringify({
            email: res.data.email,
            id: res.data.localId,
            token: res.data.idToken,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
              // Authorization: 'Bearer ' + token,
            },
          },
        );
        // axios.post(
        //   `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/`,
        //   {
        //     email: data.email,
        //     token: data.idToken,
        //     id: data.localId,
        //   },
        // );
        // loginHandler({ email: data.email, token: data.idToken, id: data.localId });
        // setTokenHandler(data.idToken);
      })
      .catch(err => dispatch(authErrorHandler(err.response.data.message)));
  };
};

// тут заменить на запрос к firebase

export const loginFetch = someData => {
  console.log(`нажали на кнопку логирования`);
  return dispatch => {
    const { email, password } = someData;
    //console.log(email, password);
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7YzopdkUjZuPqIP6V3K2kUkBt6SqiUng`,
        JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          console.log('eeee', res.data);
          dispatch(loginHandler({ email: res.data.email, id: res.data.localId }));
          dispatch(setTokenHandler(res.data.idToken));
        }
      })
      .catch(err => dispatch(authErrorHandler(err.response.data.message)));
  };
};

export const fetchTasks = token => {
  // console.log(token, 'token in dispATCJ');
  // заменить тут на бд
  return dispatch => {
    //let pageNumber = number ? number : 0;
    axios
      // .get(`https://rickandmortyapi.com/api/character?page=${data}`)
      .get(
        `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(response => {
        // console.log('response fetchTasks', response);
        // dispatch(setTotalPageAmount(response.data.info.pages));
        //const tasks = Array.from(JSON.parse(response.data));

        // console.log('from fetch tasks', JSON.parse(response.data));
        // console.log('from fetch tasks', response.data);
        const tasks = [];
        for (let key in response.data) {
          // console.log({ [dataBaseKey]: response.data[dataBaseKey].task });
          let task = {
            name: response.data[key],
            dataBaseKey: key,
          };
          //console.log(task, 'task task task');
          tasks.push({ ...task });
          //tasks.push(response.data[key].task);
          //tasks.push({ [dataBaseKey]: JSON.parse(response.data[dataBaseKey]).task });
        }
        console.log(tasks, 'tasks tasks tasks');

        dispatch(
          addTasks(
            tasks.map(item => ({
              description: item.name.task,
              id: uuid(),
              isDone: false,
              dataBaseKey: item.dataBaseKey,

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

export const addNewTask = task => {
  console.log(task);
  return dispatch => {
    axios
      .post(
        `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
        JSON.stringify({ task, isDone: false }),
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(res => {
        console.log(res.config.data);
        console.log('ответ от фиреэйс какую задачу добавилт', res.config);
        dispatch(addNewTaskHandler(JSON.parse(res.config.data).task));
        dispatch(fetchTasks());
      });
  };
};

export const taskIsDonePatch = (dataBaseKey, isDone) => {
  return dispatch => {
    axios.patch(
      `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/tasks/${dataBaseKey}.json`,
      {
        isDone: !isDone,
      },
    );
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
