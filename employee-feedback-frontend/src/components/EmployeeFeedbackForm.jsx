import React, { useState } from "react";
import { submitFeedback } from "../api/feedbackApi";

const categories = ["Work Environment", "Leadership", "Growth", "Others"];

function EmployeeFeedbackForm() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setStatus("Please enter your feedback.");
      return;
    }
    setSubmitting(true);
    setStatus("Submitting...");
    try {
      await submitFeedback({ text, category });
      setText("");
      setCategory(categories[0]);
      setStatus("✅ Feedback submitted anonymously. Thank you!");
    } catch {
      setStatus("❌ Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          Submit Anonymous Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="textarea textarea-bordered w-full resize-none"
            placeholder="Write your feedback here..."
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitting}
            required
          />

          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={submitting}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className={`btn btn-primary w-full ${submitting ? "loading" : ""}`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.startsWith("✅")
                ? "text-green-600"
                : status.startsWith("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmployeeFeedbackForm;
