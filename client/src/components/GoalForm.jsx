import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../features/goal/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");
  const { isError, isSuccess, goals, message } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createGoal({
        text,
      })
    );
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Create a New Goal!</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
