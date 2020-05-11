export const SET_TARGET_HOURS = 'SET_TARGET_HOURS';
export const UPDATE_HOURS_SPENT = 'UPDATE_HOURS_SPENT';
import axios from 'axios';

export const setTargetHours = ({ownerId, targetDate, targetHours, onSuccess, onFailure}) => 
dispatch => {
  
 
    const data = {
      ownerId: ownerId,
      targetDate: targetDate,
      targetHours: targetHours,
    };
    const options = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: data,
      url: 'https://timetracker-72258.firebaseio.com/targetHours.json',
    };
    
    axios(options).then(res => {
      
      dispatch({
        type:  SET_TARGET_HOURS,
        ownerId,
        targetDate,
        targetHours
    });
    onSuccess();
    }).catch(error => {
      console.log(err);
      onFailure();
    }) 


  }



export const updateHoursSpent = (ownerId, targetDate, hoursSpent) => {
    return {
        type:  UPDATE_HOURS_SPENT,
        ownerId,
        targetDate,
        hoursSpent
    }
  }