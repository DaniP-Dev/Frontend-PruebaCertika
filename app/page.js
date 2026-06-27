"use client";

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  completeTask,
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "../lib/tasks.api";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState(null);
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

  async function handleUpdateTask(taskId, title) {
    setBusyTaskId(taskId);
    setError("");

    try {
      const currentTask = tasks.find((task) => task.id === taskId);
      if (!currentTask) {
        throw new Error("La tarea no existe.");
      }

      const updatedTask = await updateTask(taskId, {
        title,
        status: currentTask.status,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (updateError) {
      const message = updateError.message || "No se pudo editar la tarea.";
      setError(message);
      throw updateError;
    } finally {
      setBusyTaskId(null);
    }
  }

  async function handleCompleteTask(taskId) {
    setBusyTaskId(taskId);
    setError("");

    try {
      const completedTask = await completeTask(taskId);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? completedTask : task))
      );
    } catch (completeError) {
      const message = completeError.message || "No se pudo completar la tarea.";
      setError(message);
      throw completeError;
    } finally {
      setBusyTaskId(null);
    }
  }

  async function handleDeleteTask(taskId) {
    setBusyTaskId(taskId);
    setError("");

    try {
      await deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    } catch (deleteError) {
      const message = deleteError.message || "No se pudo eliminar la tarea.";
      setError(message);
      throw deleteError;
    } finally {
      setBusyTaskId(null);
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
      {isLoading ? (
        <p className="page-loading">Cargando tareas...</p>
      ) : (
        <TaskList
          tasks={tasks}
          busyTaskId={busyTaskId}
          onUpdateTask={handleUpdateTask}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </main>
  );
}
