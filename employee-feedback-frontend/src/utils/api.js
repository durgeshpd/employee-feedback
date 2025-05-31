import { BASE_URL } from "./constants";

async function handleResponse(res) {
  if (!res.ok) {
    let errorMessage = "Something went wrong";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function submitFeedback(data) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function loginAdmin(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

export async function getFeedbacks(category = "", token) {
  let url = `${BASE_URL}/feedback`;
  if (category) url += `?category=${encodeURIComponent(category)}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

export async function markReviewed(id, token) {
  const res = await fetch(`${BASE_URL}/feedback/${id}/reviewed`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

export async function deleteFeedback(id, token) {
  const res = await fetch(`${BASE_URL}/feedback/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}
