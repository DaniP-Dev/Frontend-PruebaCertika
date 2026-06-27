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

function getErrorMessage(error, fallbackMessage) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

function getApiActionError(actionLabel, error, fallbackMessage) {
  const detail = getErrorMessage(error, fallbackMessage);
  return `Error de API al ${actionLabel}: ${detail}`;
}

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
          setError(
            getApiActionError(
              "cargar las tareas",
              loadError,
              "No se pudieron cargar las tareas."
            )
          );
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

  async function handleRefreshTasks() {
    setIsRefreshing(true);
    setError("");

    try {
      const data = await listTasks();
      setTasks(data);
    } catch (refreshError) {
      setError(
        getApiActionError(
          "actualizar las tareas",
          refreshError,
          "No se pudieron actualizar las tareas."
        )
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleCreateTask(title) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      const message = "El titulo es obligatorio.";
      setError(message);
      throw new Error(message);
    }

    setIsSubmitting(true);
    setError("");

    try {
      const createdTask = await createTask({ title: normalizedTitle });
      setTasks((currentTasks) => [...currentTasks, createdTask]);
    } catch (createError) {
      setError(
        getApiActionError("crear la tarea", createError, "No se pudo crear la tarea.")
      );
      throw createError;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateTask(taskId, title) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      const message = "El titulo es obligatorio.";
      setError(message);
      throw new Error(message);
    }

    setBusyTaskId(taskId);
    setError("");

    try {
      const currentTask = tasks.find((task) => task.id === taskId);
      if (!currentTask) {
        throw new Error("La tarea no existe.");
      }

      const updatedTask = await updateTask(taskId, {
        title: normalizedTitle,
        status: currentTask.status,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (updateError) {
      setError(
        getApiActionError(
          "editar la tarea",
          updateError,
          "No se pudo editar la tarea."
        )
      );
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
      setError(
        getApiActionError(
          "completar la tarea",
          completeError,
          "No se pudo completar la tarea."
        )
      );
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
      setError(
        getApiActionError(
          "eliminar la tarea",
          deleteError,
          "No se pudo eliminar la tarea."
        )
      );
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

      <div className="page-actions">
        <button
          type="button"
          className="page-actions__button"
          onClick={handleRefreshTasks}
          disabled={isLoading || isRefreshing}
        >
          {isRefreshing ? "Actualizando..." : "Actualizar lista"}
        </button>
      </div>

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
