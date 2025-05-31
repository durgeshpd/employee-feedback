import React, { useEffect, useState } from "react";
import { getFeedbacks, markReviewed, deleteFeedback } from "../utils/api";

function AdminDashboard({ token, logout }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getFeedbacks(category, token);
      setFeedbacks(data);
    } catch {
      setError("Failed to fetch feedbacks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [category]);

  const handleMarkReviewed = async (id) => {
    try {
      await markReviewed(id, token);
      fetchFeedbacks();
    } catch {
      setError("Failed to mark as reviewed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this feedback?")) return;
    try {
      await deleteFeedback(id, token);
      fetchFeedbacks();
    } catch {
      setError("Failed to delete feedback.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
        <button className="btn btn-error" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="form-control mb-6 max-w-xs">
        <label className="label" htmlFor="category">
          <span className="label-text">Filter by Category</span>
        </label>
        <select
          id="category"
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Work Environment</option>
          <option>Leadership</option>
          <option>Growth</option>
          <option>Others</option>
        </select>
      </div>

      {loading ? (
        <progress className="progress w-full"></progress>
      ) : error ? (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2v6m0-10a9 9 0 11-6.364 2.636"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No feedback found.
        </p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <div
              key={f._id}
              className={`card bg-base-100 shadow-md ${
                f.reviewed ? "border border-success" : ""
              }`}
            >
              <div className="card-body">
                <h3 className="card-title">{f.category}</h3>
                <p>{f.text}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {f.reviewed ? (
                    <span className="badge badge-success">Reviewed</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </p>
                <div className="card-actions mt-4">
                  {!f.reviewed && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleMarkReviewed(f._id)}
                    >
                      Mark Reviewed
                    </button>
                  )}
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(f._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
