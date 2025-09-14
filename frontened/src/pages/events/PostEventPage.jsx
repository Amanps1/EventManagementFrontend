import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../context/EventContext";

const PostEventPage = () => {
  const { eventId } = useParams(); 
  const { submitFeedback } = useEvent();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(eventId, { feedback, rating });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Post-Event Actions
      </h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rate the Event
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Share your thoughts about the event..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-lg font-semibold text-green-600">Thank You!</h2>
          <p className="text-gray-600 mt-2">
            Your feedback has been submitted successfully.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostEventPage;
