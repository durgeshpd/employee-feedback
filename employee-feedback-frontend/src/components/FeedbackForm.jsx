import React, { useState } from "react";
import { submitFeedback } from "../utils/api";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work Environment");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setMessage("Feedback text is required.");
      setIsError(true);
      return;
    }
    setMessage("Submitting...");
    setIsError(false);
    try {
      await submitFeedback({ text, category });
      setMessage("Feedback submitted successfully!");
      setIsError(false);
      setText("");
      setCategory("Work Environment");
    } catch {
      setMessage("Failed to submit feedback.");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900 px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-primary text-center mb-4">
            Submit Feedback
          </h2>

          {message && (
            <div
              className={`alert ${
                isError ? "alert-error" : "alert-success"
              } shadow-lg mb-4 flex items-center`}
              role="alert"
            >
              <div className="flex items-center gap-2">
                {isError ? (
                  <FiAlertCircle className="text-xl text-red-600" />
                ) : (
                  <FiCheckCircle className="text-xl text-green-600" />
                )}
                <span>{message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label" htmlFor="text">
                <span className="label-text">Feedback</span>
              </label>
              <textarea
                id="text"
                className="textarea textarea-bordered"
                rows="5"
                placeholder="Your feedback here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="category">
                <span className="label-text">Category</span>
              </label>
              <select
                id="category"
                className="select select-bordered"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Work Environment</option>
                <option>Leadership</option>
                <option>Growth</option>
                <option>Others</option>
              </select>
            </div>

            <button className="btn btn-primary mt-4" type="submit">
              Submit Anonymously
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
