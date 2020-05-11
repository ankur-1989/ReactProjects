import axios from "axios";
import Task from "../../models/TaskTracker";

export const CREATE_TASK = "CREATE_TASK";
export const UPDATE_TIME_SPENT = "UPDATE_TIME_SPENT";
export const FETCH_TASK_REQUEST = 'FETCH_TRANSPORT_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';


export const fetchTaskRequest = () => {
  return {
    type: FETCH_TASK_REQUEST
}
} 

export const fetchTaskSuccess = (tasks) => {
  return {
      type: FETCH_TASK_SUCCESS,
      userTasks: tasks
  }
}




export const fetchTaskFailure = error => {
  return {
      type: FETCH_TASK_FAILURE,
      payload: error
  }
}

export const createTask = ({ ownerId, date, task, onSuccess, onFailure }) => (
  dispatch
) => {
  const data = {
    ownerId: ownerId,
    date: date,
    task: task,
    hours: 0,
    minutes: 0,
  };
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data: data,
    url: "https://timetracker-72258.firebaseio.com/task.json",
  };
  axios(options)
    .then((res) => {
      
      dispatch({
        type: CREATE_TASK,
        ownerId,
        date,
        task,
      });
      onSuccess();
    })
    .catch((error) => {
      console.log(err);
      onFailure();
    });
};

export const fetchTask = ({ onSuccess, onFailure }) => dispatch => {
  
  dispatch(fetchTaskRequest());
  axios
    .get("https://timetracker-72258.firebaseio.com/task.json")
    .then((response) => {
      const tasks = [];

      for (const key in response.data) {
        tasks.push(
          new Task(
            response.data[key].ownerId,
            response.data[key].date,
            response.data[key].task,
            response.data[key].hours,
            response.data[key].minutes
          )
        );
      }

      dispatch(fetchTaskSuccess(tasks));
      onSuccess();
    })
    .catch((error) => {
      if(error && error.response && response.data){
        dispatch(fetchTransportfailure({errorMessage: error.response.data.message, errorCode: error.response.status}));
        onFailure();
    }
    });
};

export const updateTimeSpent = (date, task, hours, minutes) => {
  return {
    type: UPDATE_TIME_SPENT,
    date,
    task,
    hours,
    minutes,
  };
};
