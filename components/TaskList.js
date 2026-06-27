import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  busyTaskId,
  onUpdateTask,
  onCompleteTask,
  onDeleteTask,
}) {
  if (!tasks.length) {
    return <p className="tasks-empty">No hay tareas todavia.</p>;
  }

  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isBusy={busyTaskId === task.id}
          onUpdateTask={onUpdateTask}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}
