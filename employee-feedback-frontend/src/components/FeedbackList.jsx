import React, { useState, useEffect } from "react";
import FeedbackItem from "./FeedbackItem";
import { getFeedbacks, markReviewed, deleteFeedback } from "../api/feedbackApi";

const categories = ["All", "Work Environment", "Leadership", "Growth", "Others"];

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeedbacks = async (category) => {
    setLoading(true);
    setError("");
    try {
      const data = await getFeedbacks(category === "All" ? null : category);
      setFeedbacks(data);
    } catch {
      setError("Failed to fetch feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(categoryFilter);
  }, [categoryFilter]);

  const handleMarkReviewed = async (id) => {
    try {
      await markReviewed(id);
      setFeedbacks((prev) =>
        prev.map((f) => (f._id === id ? { ...f, reviewed: true } : f))
      );
    } catch {
      alert("Failed to mark as reviewed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this feedback?")) return;
    try {
      await deleteFeedback(id);
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } catch {
      alert("Failed to delete feedback.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Feedback Panel</h1>

      <div className="mb-4 flex items-center justify-between">
        <label htmlFor="category" className="mr-2 font-semibold">
          Filter by category:
        </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered w-1/3"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center text-gray-500">
          <progress className="progress w-1/3"></progress>
          <p>Loading feedbacks...</p>
        </div>
      )}

      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && feedbacks.length === 0 && (
        <p className="text-center text-gray-500">No feedback found.</p>
      )}

      <div>
        {!loading &&
          feedbacks.map((feedback) => (
            <FeedbackItem
              key={feedback._id}
              feedback={feedback}
              onMarkReviewed={handleMarkReviewed}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default FeedbackList;
