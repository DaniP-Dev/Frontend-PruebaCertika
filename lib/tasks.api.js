const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const TASKS_PATH = "/api/tasks";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    const contentType = response.headers.get("content-type") || "";
    const isJsonResponse = contentType.includes("application/json");

    if (isJsonResponse) {
      try {
        const errorPayload = await response.json();
        if (errorPayload?.message) {
          message = errorPayload.message;
        }
      } catch {
        // Keep default message when error payload is invalid.
      }
    } else if (response.status === 404) {
      message = `No se encontro ${TASKS_PATH} en ${API_BASE_URL}. Verifica que el backend este corriendo y que NEXT_PUBLIC_API_URL sea correcto.`;
    }

    throw new Error(message);
  }

  return response.json();
}

export function listTasks() {
  return request(TASKS_PATH);
}

export function createTask({ title }) {
  return request(TASKS_PATH, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}
