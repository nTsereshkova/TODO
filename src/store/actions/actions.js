import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import authSlice from '../slices/authSlice';
import mainSlice from '../slices/mainSlice';

export const {
  loginHandler,
  setTokenHandler,
  setDataBaseKey,
  loginCheckStatusHandler,
  firstLoadHandler,
  logoutHandler,
  authErrorHandler,
  clearErrorHandler,
} = authSlice.actions;

export const {
  addTasks,
  addNewTaskHandler,
  taskIsDoneHandler,
  isDoneCheckHandler,
  mainErrorHandler,
  showCalendarHandler,
  clearTasksWhenLogOut,
} = mainSlice.actions;

export const signInFetch = someData => {
  const { email, password } = someData;
  return dispatch => {
    axios
      .post(
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
        if (res.status === 200) {
          axios
            .post(
              `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
              JSON.stringify({
                email: res.data.email,
                id: res.data.localId,
                token: res.data.idToken,
              }),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then(res => {
              dispatch(setDataBaseKey(res.data.name));
              dispatch(clearErrorHandler());
              //console.log('здесь должны занулить ошибку ');
              dispatch(firstLoadHandler(false));
            })
            .catch(err =>
              dispatch(authErrorHandler(err.response.data.error.message)),
            );
        }
      })
      .catch(err => dispatch(authErrorHandler(err.response.data.error.message)));
  };
};

export const loginFetch = someData => {
  console.log(`нажали на кнопку логирования`);
  return dispatch => {
    const { email, password } = someData;
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
          dispatch(loginHandler({ email: res.data.email, id: res.data.localId }));
          dispatch(setTokenHandler(res.data.idToken));
          dispatch(clearErrorHandler());
        }
      })
      .catch(err => dispatch(authErrorHandler(err.response.data.error.message)));
  };
};

export const fetchTasks = token => {
  let dataBaseKey = JSON.parse(localStorage.getItem('data'));
  return dispatch => {
    axios
      .get(
        `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/users/${dataBaseKey}/tasks.json`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        const tasks = [];
        for (let key in response.data) {
          let task = {
            name: response.data[key],
            dataBaseKey: key,
          };
          localStorage.setItem(
            `${task.name.task}`,
            JSON.stringify({
              description: task.name.task,
              isDone: task.name.isDone,
            }),
          );

          tasks.push({ ...task });
        }

        dispatch(
          addTasks(
            tasks.map(item => ({
              description: item.name.task,
              id: uuid(),
              isDone: localStorage.getItem(`${item.name.task}`)
                ? JSON.parse(localStorage.getItem(`${item.name.task}`)).isDone
                : false,
              dataBaseKey: item.dataBaseKey,
            })),
          ),
        );
      })
      .catch(err => dispatch(mainErrorHandler(err.response.data.message)));
  };
};

export const addNewTask = task => {
  let dataBaseKey = JSON.parse(localStorage.getItem('data'));
  return dispatch => {
    axios
      .post(
        `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/users/${dataBaseKey}/tasks.json`,
        JSON.stringify({ task, isDone: false }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        dispatch(addNewTaskHandler(JSON.parse(res.config.data).task));
        dispatch(fetchTasks());
      });
  };
};

export const taskIsDonePatch = item => {
  const userDataBaseKey = JSON.parse(localStorage.getItem('data'));
  console.log(item, 'item   taskIsDonePatch');

  const { dataBaseKey, isDone, id } = item;
  return dispatch => {
    // сначала изменения в базе данных
    axios
      .patch(
        `https://smart-todo-645e5-default-rtdb.europe-west1.firebasedatabase.app/users/${userDataBaseKey}/tasks/${dataBaseKey}.json`,
        {
          isDone: !isDone,
        },
      )
      .then(() => {
        // потом в локал сторадж
        //const task = localStorage.getItem(`${item.description}`);
        localStorage.setItem(
          `${item.description}`,
          JSON.stringify({
            description: item.description,
            isDone: !item.isDone,
          }),
        );
        // потом изменгения на клиенте
        dispatch(taskIsDoneHandler(id));
      });
  };
};
