import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function RankingPage() {
  const { dispatch, apiBaseUrl } = useWorkoutsContext();
  const [rankings, setRankings] = useState([]);
  const [rankingType, setRankingType] = useState("reps"); // Default to reps ranking

  const fetchRankings = async (type) => {
    const endpoint =
      type === "reps"
        ? `${apiBaseUrl}/api/workouts/ranking/reps`
        : `${apiBaseUrl}/api/workouts/ranking/load`;
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      if (response.ok) {
        setRankings(json); // Update the state for the rankings
        dispatch({ type: "SET_RANKINGS", payload: json }); // Optional: Use reducer to store rankings
      }
    } catch (error) {
      console.error("Error fetching rankings:", error);
    }
  };

  useEffect(() => {
    fetchRankings(rankingType); // Fetch rankings when rankingType changes
  }, [rankingType]);

  return (
    <div className="pages">
      <div className="ranking-page">
        <h1>Workout Rankings</h1>
        <div className="ranking-buttons">
          <button className="btn" onClick={() => setRankingType("reps")}>
            Most Reps
          </button>
          <button className="btn" onClick={() => setRankingType("load")}>
            Most Load
          </button>
        </div>
        <div className="rankings">
          <h2>{rankingType === "reps" ? "Most Reps" : "Most Load"} Rankings</h2>
          <ul>
            {rankings.map((rank, index) => (
              <li key={rank._id}>
                {index + 1}. {rank.user} -{" "}
                {rankingType === "reps" ? rank.totalReps : rank.totalLoad}
                {rankingType === "reps" ? " Reps" : " Load"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RankingPage;
