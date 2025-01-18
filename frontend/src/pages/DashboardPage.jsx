import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import SortingOptions from "../components/SortingOptions";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function DashboardPage() {
  const navigate = useNavigate();

  const { workouts, dispatch } = useWorkoutsContext();
  const { userId } = useParams();

  const handleSort = async (field, order) => {
    const response = await fetch(
      `/api/workouts/user/${userId}?sortBy=${field}&order=${order}`
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: json });
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api/workouts/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json(); // get an array of object
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } else if (!response.ok) {
        console.log("Unauthorized access. Please log in again.");
        alert("Unauthorized access. Please log in again.");
        navigate("/");
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
                haveDelete={true}
              />
            ))}
          {!workouts && <h2>No workouts created by you yet.</h2>}
        </div>
        <div className="sorting">
          <SortingOptions onSortChange={handleSort} />
          <button>Log Out</button>
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
