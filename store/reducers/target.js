import SET_TARGET_HOURS from '../actions/target';
import UPDATE_HOURS_SPENT from '../actions/target';

const intialState = {
    userDays: [],
    targetDate: '',
    targetHours: '',
    hoursSpent: ''
    
};

export default function targetReducer(state = intialState, action) {


    switch (action.type) {
        case SET_TARGET_HOURS:
          const newTarget = new TargetHour(action.ownerId, action.targetDate, action.targetHours, 0);
          return {
            ...state,
            userDays: state.userDays.concat(newTarget),
          };
        case UPDATE_HOURS_SPENT:
          const targetIndex = state.userDays.findIndex(
            (day) => day.date === action.date && day.ownerId === action.ownerId
          );
    
          const updatedTarget = new TargetHour(
            state.userDays[targetIndex].ownerId,
            state.userDays[targetIndex].date,
            state.userDays[targetIndex].targetHours,
            action.hoursSpent
          );
          const updatedUserDays = [...state.userDays];
          updatedUserDays[targetIndex] = updatedTarget;
    
          return{
            ...state,
            userDays: updatedUserDays
          }
      }
    return state;

}