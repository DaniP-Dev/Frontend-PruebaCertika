"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { createTask, listTasks } from "../lib/tasks.api";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setError("");
        const data = await listTasks();
        if (isMounted) {
          setTasks(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "No se pudieron cargar las tareas.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateTask(title) {
    setIsSubmitting(true);
    setError("");

    try {
      const createdTask = await createTask({ title });
      setTasks((currentTasks) => [...currentTasks, createdTask]);
    } catch (createError) {
      const message = createError.message || "No se pudo crear la tarea.";
      setError(message);
      throw createError;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container">
      <h1>Prueba Certika - Tasks</h1>
      <p className="page-subtitle">
        Lista y crea tareas consumiendo la API del backend.
      </p>

      <TaskForm onCreateTask={handleCreateTask} isSubmitting={isSubmitting} />

      {error ? <p className="page-error">{error}</p> : null}
      {isLoading ? <p className="page-loading">Cargando tareas...</p> : <TaskList tasks={tasks} />}
    </main>
  );
}
