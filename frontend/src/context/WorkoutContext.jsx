import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();
// just for the local state nothing to do with the database
export const workoutsReducer = (state, action) => {
  switch(action.type){
    case "SET_WORKOUS":
      return { // new value for the state when the action.type is SET_WORKOUS
        workouts : action.payload
      }
    case "CREATE_WORKOUT":
      return { // a single new workout object // state is the previous object
        workouts : [action.payload, ...state.workouts]
      }
    default :
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  // dispatch ({type: "SET_WORKOUS", payload: [{}, {}]})
  // when we call the dispatch function, it will call the workoutsReducer
  return (
    <WorkoutsContext.Provider value={{state, dispatch}}>
      {children}
    </WorkoutsContext.Provider>
  );
};
