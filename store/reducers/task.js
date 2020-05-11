import CREATE_TASK from "../actions/task";
import UPDATE_TIME_SPENT from "../actions/task";
import {FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE} from '../actions/task';

const intialState = {
  userTasks: [],
  loading: false,
  date: "",
  task: "",
  hours: 0,
  minutes: 0,
  error: {}
};

export default function taskReducer(state = intialState, action) {

  switch (action.type) {
    case FETCH_TASK_REQUEST: return {
      ...state,
      loading: true,
    };
    case FETCH_TASK_SUCCESS: return {
      ...state,
      loading: false,
      userTasks: action.userTasks
    }
    case FETCH_TASK_FAILURE:
    return {
      ...state,
      loading: false,
      userTasks: [],
      error: action.payload
    }
    case CREATE_TASK:
      const newTask = new Task(action.ownerId, action.date, action.task, 0, 0);
      return {
        ...state,
        userTasks: state.userTasks.concat(newTask),
      };
    case UPDATE_TIME_SPENT:
      const taskIndex = state.userTasks.findIndex(
        (task) => task.date === action.date && task.task === action.task
      );

      const updatedTask = new Task(
        state.userTasks[taskIndex].ownerId,
        state.userTasks[taskIndex].date,
        state.userTasks[taskIndex].task,
        action.hours,
        action.minutes
      );
      const updatedUserTasks = [...state.userTasks];
      updatedUserTasks[taskIndex] = updatedTask;

      return{
        ...state,
        userTasks: updatedUserTasks
      }
  }

  return state;
}
