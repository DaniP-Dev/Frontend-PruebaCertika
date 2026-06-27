export default function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p className="tasks-empty">No hay tareas todavia.</p>;
  }

  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <li key={task.id} className="tasks-list__item">
          <span>{task.title}</span>
          <span
            className={`tasks-list__status ${
              task.status === "completed" ? "tasks-list__status--completed" : ""
            }`}
          >
            {task.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
