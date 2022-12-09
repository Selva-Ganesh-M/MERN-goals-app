import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import { getGoals, reset } from "../features/goal/goalSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const goals = useSelector((state) => state.goals.goals);
  useEffect(() => {
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
