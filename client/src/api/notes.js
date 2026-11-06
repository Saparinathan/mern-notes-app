// All communication with the backend lives in this one file.
// If the API changes, you only edit here.

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";

// Shared helper: sends the request, reads the JSON reply,
// and throws an Error if the server answered with a failure status.
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    // res.ok is false for 400, 404, 500 etc.
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

const jsonHeaders = { "Content-Type": "application/json" };

export const getNotes = () => request(BASE_URL);

export const createNote = (note) =>
  request(BASE_URL, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(note), // turn JS object into JSON text
  });

export const updateNote = (id, note) =>
  request(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(note),
  });

export const deleteNote = (id) =>
  request(`${BASE_URL}/${id}`, { method: "DELETE" });
