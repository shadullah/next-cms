"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    description: "",
    compnyName: "",
    name: "",
  });
  const [imgFeed, setImgFeed] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFeed(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("compnyName", formData.compnyName);
      formDataToSend.append("name", formData.name);
      if (imgFeed) {
        formDataToSend.append("imgFeed", imgFeed);
      }

      const response = await fetch(`/api/v1/feedback`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Feedback submitted successfully!");
        // Reset form
        setFormData({
          description: "",
          compnyName: "",
          name: "",
        });
        setImgFeed(null);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Submit Feedback</h1>
        <p>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-800"
          >
            &larr; Back to Dashboard
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="compnyName" className="block mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="compnyName"
            name="compnyName"
            value={formData.compnyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="imgFeed" className="block mb-2">
            Image
          </label>
          <input
            type="file"
            id="imgFeed"
            name="imgFeed"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
