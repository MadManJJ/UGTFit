import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();
// just for the local state nothing to do with the database
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        // new value for the state when the action.type is SET_WORKOUS
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        // a single new workout object // state is the previous object
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  const apiBaseUrl =
    import.meta.env.MODE === "production"
      ? "https://ugtfit.up.railway.app"
      : "http://localhost:4000";

  // console.log(import.meta.env.MODE);
  // dispatch ({type: "SET_WORKOUS", payload: [{}, {}]})
  // when we call the dispatch function, it will call the workoutsReducer
  return (
    // ...state mean the workouts (it literally the same)
    <WorkoutsContext.Provider value={{ ...state, dispatch, apiBaseUrl }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
