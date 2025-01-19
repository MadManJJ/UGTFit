import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// data fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetail({
  workout,
  haveDelete,
  haveCreateBy = false,
  userId = "",
}) {
  const { dispatch, apiBaseUrl } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(`${apiBaseUrl}/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await response.json(); // document we just deleted

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  if (haveCreateBy) {
  }
  return (
    <div className="workout-details">
      <h4>{workout.title} </h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{new Date(workout.createdAt).toDateString()}</p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>
      {haveCreateBy && (
        <span>
          <strong>Created by: </strong>
          {userId}
        </span>
      )}
      {haveDelete && (
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      )}
    </div>
  );
}

export default WorkoutDetail;
