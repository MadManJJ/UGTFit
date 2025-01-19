import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import SortingOptions from "../components/SortingOptions";

// components
import WorkoutDetails from "../components/WorkoutDetails";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  const handleSort = async (field, order) => {
    const response = await fetch(
      `/api/workouts?sortBy=${field}&order=${order}`
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: json });
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json(); // get an array of object
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]); // run only one (when the component first render) []

  return (
    <div className="pages">
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails
                key={workout._id}
                workout={workout}
                haveDelete={false}
              />
            ))}
        </div>
        <div className="sorting">
          <SortingOptions onSortChange={handleSort} />
        </div>
      </div>
    </div>
  );
}

export default Home;
