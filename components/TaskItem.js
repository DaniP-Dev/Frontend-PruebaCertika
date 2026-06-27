"use client";

import { useState } from "react";

export default function TaskItem({
  task,
  onUpdateTask,
  onCompleteTask,
  onDeleteTask,
  isBusy,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [editError, setEditError] = useState("");

  function handleStartEdit() {
    setDraftTitle(task.title);
    setEditError("");
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setDraftTitle(task.title);
    setEditError("");
    setIsEditing(false);
  }

  async function handleSaveEdit(event) {
    event.preventDefault();
    const normalizedTitle = draftTitle.trim();

    if (!normalizedTitle) {
      setEditError("El titulo es obligatorio.");
      return;
    }

    try {
      setEditError("");
      await onUpdateTask(task.id, normalizedTitle);
      setIsEditing(false);
    } catch {
      // API errors are displayed at page level.
    }
  }

  async function handleCompleteTask() {
    try {
      setEditError("");
      await onCompleteTask(task.id);
    } catch {
      // API errors are displayed at page level.
    }
  }

  async function handleDeleteTask() {
    try {
      setEditError("");
      await onDeleteTask(task.id);
    } catch {
      // API errors are displayed at page level.
    }
  }

  return (
    <li className="tasks-list__item">
      <div className="tasks-list__content">
        {isEditing ? (
          <form className="task-inline-form" onSubmit={handleSaveEdit}>
            <input
              className="task-inline-form__input"
              type="text"
              value={draftTitle}
              onChange={(event) => {
                setDraftTitle(event.target.value);
                if (editError) {
                  setEditError("");
                }
              }}
              required
              maxLength={120}
              disabled={isBusy}
            />
            <div className="task-inline-form__actions">
              <button type="submit" className="tasks-list__button" disabled={isBusy}>
                Guardar
              </button>
              <button
                type="button"
                className="tasks-list__button tasks-list__button--secondary"
                onClick={handleCancelEdit}
                disabled={isBusy}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <p
            className={`tasks-list__title ${
              task.status === "completed" ? "tasks-list__title--completed" : ""
            }`}
          >
            {task.title}
          </p>
        )}

        <span
          className={`tasks-list__status ${
            task.status === "completed" ? "tasks-list__status--completed" : ""
          }`}
        >
          {task.status}
        </span>
        {editError ? <p className="task-inline-form__error">{editError}</p> : null}
      </div>

      {!isEditing ? (
        <div className="tasks-list__actions">
          <button
            type="button"
            className="tasks-list__button tasks-list__button--secondary"
            onClick={handleStartEdit}
            disabled={isBusy}
          >
            Editar
          </button>
          <button
            type="button"
            className="tasks-list__button tasks-list__button--complete"
            onClick={handleCompleteTask}
            disabled={isBusy || task.status === "completed"}
          >
            Completar
          </button>
          <button
            type="button"
            className="tasks-list__button tasks-list__button--danger"
            onClick={handleDeleteTask}
            disabled={isBusy}
          >
            Eliminar
          </button>
        </div>
      ) : null}
    </li>
  );
}
