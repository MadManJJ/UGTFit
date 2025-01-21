import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import SortingOptions from "../components/SortingOptions";

function DashboardPage() {
  const navigate = useNavigate();

  const { workouts, dispatch, apiBaseUrl } = useWorkoutsContext();
  const { userId } = useParams();
  const [noWorkouts, setNoWorkouts] = useState(false);

  const handleSort = async (field, order) => {
    const response = await fetch(
      `${apiBaseUrl}/api/workouts/user/${userId}?sortBy=${field}&order=${order}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      // console.log(userId);
      const response = await fetch(
        `${apiBaseUrl}/api/workouts/user/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json(); // get an array of object
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
      } else if (!response.ok) {
        console.log("Unauthorized access. Please log in again.");
        console.log(json.message);
        alert("Unauthorized access. Please log in again.");
        alert(json.error);
        navigate("/");
      }
      if (json.workouts.length == 0) {
        // console.log("No workouts created by you yet.");
        setNoWorkouts(true);
      } else {
        // console.log(json.workouts);
        setNoWorkouts(false);
      }
    };

    fetchWorkouts();
  }, [dispatch]); // run only one (when the component first render) []

  return (
    <div className="pages">
      <h1>Dashboard</h1>
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
          {noWorkouts && <h2>No workouts created by you yet.</h2>}
        </div>
        <div className="sorting">
          <SortingOptions onSortChange={handleSort} />
          <WorkoutForm userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
