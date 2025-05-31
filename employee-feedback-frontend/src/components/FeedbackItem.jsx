import React from "react";

function FeedbackItem({ feedback, onMarkReviewed, onDelete }) {
  return (
    <div
      className={`card bg-base-100 shadow-md ${
        feedback.reviewed ? "border border-success" : ""
      }`}
    >
      <div className="card-body">
        <h3 className="card-title">{feedback.category}</h3>
        <p>{feedback.text}</p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {feedback.reviewed ? (
            <span className="badge badge-success">Reviewed</span>
          ) : (
            <span className="badge badge-warning">Pending</span>
          )}
        </p>
        <div className="card-actions mt-4">
          {!feedback.reviewed && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => onMarkReviewed(feedback._id)}
            >
              Mark Reviewed
            </button>
          )}
          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(feedback._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;
