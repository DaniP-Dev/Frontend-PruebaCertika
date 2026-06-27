"use client";

import { useState } from "react";

export default function TaskForm({ onCreateTask, isSubmitting }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      setError("El titulo es obligatorio.");
      return;
    }

    try {
      setError("");
      await onCreateTask(normalizedTitle);
      setTitle("");
    } catch {
      // API errors are displayed at page level.
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="task-form__label" htmlFor="task-title">
        Nueva tarea
      </label>
      <div className="task-form__row">
        <input
          id="task-title"
          className="task-form__input"
          type="text"
          placeholder="Ej. Preparar reporte"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) {
              setError("");
            }
          }}
          required
          maxLength={120}
          disabled={isSubmitting}
        />
        <button className="task-form__button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear"}
        </button>
      </div>
      {error ? <p className="task-form__error">{error}</p> : null}
    </form>
  );
}
