import { UserActionTypes } from './user.types'
// A reducer is a function that gets two properties, it gets a state object which represents the previous state, and then it receives an action. That action is an object with two properties -- a type: 'string' to tell the reducer what specific action is coming through and the action may/may not have a Payload as well. 
// The state property of the reducer is what the redux store is going to pass to this reducer as the current state when the action gets fired. 
// Needs a initial state value 

const INITIAL_STATE = {
    currentUser: null
}

// If state is undefined then INITAL STATE gets set as the default parameter value for state. Just like creating an initial state value when creating Components. 
const userReducer = (state = INITIAL_STATE, action) => {
    // switch statement. Case statement and default value. Based on action.type value (a string) if the case of that action type is what we want, then we render something (the : after case) otherwise by default we just return the state.
    // EVERY SINGLE REDUCER GETS EVERY ACTION FIRED even if not related to this reducer. That is why we use case and default. 
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state, 
                currentUser: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;