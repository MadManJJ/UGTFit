import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext); // use the value of the context which is value={{state, dispatch}}

    if(!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider');
    }

    return context;
};