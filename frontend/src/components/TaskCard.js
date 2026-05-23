function TaskCard(props) {

  return (

    <div className="task-card">

      <h3>{props.title}</h3>

      <p
        className={
          props.status === "Completed"
            ? "completed-status"
            : "pending-status"
        }
      >
        Status: {props.status}
      </p>

      <button
        className="complete-btn"

        onClick={() =>
          props.completeTask(props.id)
        }
      >
        Complete
      </button>

      <button
        className="delete-btn"

        onClick={() =>
          props.deleteTask(props.id)
        }
      >
        Delete
      </button>

    </div>

  );
}

export default TaskCard;