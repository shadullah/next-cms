"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface TextData {
  _id: string;
  hero: {
    title: string;
  };
  expert: {
    paragraph: string;
    expertiseTypes: string[];
  };
  overview: {
    statistics: {
      projects: number;
      awards: number;
    };
    heading: string;
    paragraph: string;
  };
  digitalPartners: {
    title: string;
    paragraph: string;
    yearsInMarket: number;
    satisfiedCustomers: number;
  };
  team: {
    statistics: {
      fiveStarReviews: number;
      expertCount: number;
    };
    paragraph: string;
    story: string;
  };
  bigSection: {
    heading: string;
  };
  services: {
    serviceTypes: Array<{
      name: string;
      _id: string;
    }>;
  };
  footer: {
    contact: {
      phoneNumber: string;
      address: string;
      email: string;
    };
    paragraph: string;
  };
}

const HomeTexts = () => {
  const [formData, setFormData] = useState<TextData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/text");
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load text data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = <
    K extends keyof TextData,
    F extends keyof TextData[K]
  >(
    section: K,
    field: F,
    value: TextData[K][F] extends Record<string, unknown>
      ? string | number
      : TextData[K][F],
    nestedField?: string
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;

      const sectionData = prev[section];
      const fieldData = sectionData[field];

      // Handle nested field updates
      if (
        nestedField &&
        typeof fieldData === "object" &&
        fieldData !== null &&
        !Array.isArray(fieldData)
      ) {
        return {
          ...prev,
          [section]: {
            ...(sectionData as Record<string, unknown>),
            [field]: {
              ...fieldData,
              [nestedField]: value,
            },
          },
        };
      }

      // Handle top-level field updates
      return {
        ...prev,
        [section]: {
          ...(sectionData as Record<string, unknown>),
          [field]: value,
        },
      };
    });
  };

  const handleExpertiseTypeChange = (index: number, value: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newExpertiseTypes = [...prev.expert.expertiseTypes];
      newExpertiseTypes[index] = value;
      return {
        ...prev,
        expert: {
          ...prev.expert,
          expertiseTypes: newExpertiseTypes,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!formData?._id) {
        throw new Error("Text ID not found");
      }

      const updateData = {
        hero: {
          title: formData.hero.title,
        },
        expert: {
          paragraph: formData.expert.paragraph,
          expertiseTypes: formData.expert.expertiseTypes,
        },
        overview: {
          statistics: {
            projects: formData.overview.statistics.projects,
            awards: formData.overview.statistics.awards,
          },
          heading: formData.overview.heading,
          paragraph: formData.overview.paragraph,
        },
        digitalPartners: {
          title: formData.digitalPartners.title,
          paragraph: formData.digitalPartners.paragraph,
          yearsInMarket: formData.digitalPartners.yearsInMarket,
          satisfiedCustomers: formData.digitalPartners.satisfiedCustomers,
        },
        team: {
          statistics: {
            fiveStarReviews: formData.team.statistics.fiveStarReviews,
            expertCount: formData.team.statistics.expertCount,
          },
          paragraph: formData.team.paragraph,
          story: formData.team.story,
        },
        bigSection: {
          heading: formData.bigSection.heading,
        },
        services: {
          serviceTypes: formData.services.serviceTypes,
        },
        footer: {
          contact: {
            phoneNumber: formData.footer.contact.phoneNumber,
            address: formData.footer.contact.address,
            email: formData.footer.contact.email,
          },
          paragraph: formData.footer.paragraph,
        },
      };

      const response = await axios.patch(
        `/api/v1/text/${formData._id}`,
        updateData
      );

      if (response.data.success) {
        toast.success("Homepage text updated successfully!");
      }
    } catch (error) {
      console.error("Error updating text:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update text"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!formData) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Update Homepage Text</h1>
        <Link
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-800"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={formData.hero.title}
              onChange={(e) =>
                handleInputChange("hero", "title", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </section>

        {/* Expert Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expert Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Paragraph</label>
              <textarea
                value={formData.expert.paragraph}
                onChange={(e) =>
                  handleInputChange("expert", "paragraph", e.target.value)
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-2">Expertise Types</label>
              {formData.expert.expertiseTypes.map((type, index) => (
                <input
                  key={index}
                  type="text"
                  value={type}
                  onChange={(e) =>
                    handleExpertiseTypeChange(index, e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Overview Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Heading</label>
              <input
                type="text"
                value={formData.overview.heading}
                onChange={(e) =>
                  handleInputChange("overview", "heading", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Paragraph</label>
              <textarea
                value={formData.overview.paragraph}
                onChange={(e) =>
                  handleInputChange("overview", "paragraph", e.target.value)
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Projects Count</label>
                <input
                  type="number"
                  value={formData.overview.statistics.projects}
                  onChange={(e) =>
                    handleInputChange(
                      "overview",
                      "statistics",
                      parseInt(e.target.value),
                      "projects"
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-2">Awards Count</label>
                <input
                  type="number"
                  value={formData.overview.statistics.awards}
                  onChange={(e) =>
                    handleInputChange(
                      "overview",
                      "statistics",
                      parseInt(e.target.value),
                      "awards"
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Digital Partners Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Digital Partners Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={formData.digitalPartners.title}
                onChange={(e) =>
                  handleInputChange("digitalPartners", "title", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Paragraph</label>
              <textarea
                value={formData.digitalPartners.paragraph}
                onChange={(e) =>
                  handleInputChange(
                    "digitalPartners",
                    "paragraph",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Years in Market</label>
                <input
                  type="number"
                  value={formData.digitalPartners.yearsInMarket}
                  onChange={(e) =>
                    handleInputChange(
                      "digitalPartners",
                      "yearsInMarket",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-2">Satisfied Customers</label>
                <input
                  type="number"
                  value={formData.digitalPartners.satisfiedCustomers}
                  onChange={(e) =>
                    handleInputChange(
                      "digitalPartners",
                      "satisfiedCustomers",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Footer Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Paragraph</label>
              <textarea
                value={formData.footer.paragraph}
                onChange={(e) =>
                  handleInputChange("footer", "paragraph", e.target.value)
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                value={formData.footer.contact.phoneNumber}
                onChange={(e) =>
                  handleInputChange(
                    "footer",
                    "contact",
                    e.target.value,
                    "phoneNumber"
                  )
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Address</label>
              <input
                type="text"
                value={formData.footer.contact.address}
                onChange={(e) =>
                  handleInputChange(
                    "footer",
                    "contact",
                    e.target.value,
                    "address"
                  )
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={formData.footer.contact.email}
                onChange={(e) =>
                  handleInputChange(
                    "footer",
                    "contact",
                    e.target.value,
                    "email"
                  )
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={updating}
          className={`w-full bg-blue-500 text-white py-3 rounded-lg ${
            updating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {updating ? "Updating..." : "Update Homepage Text"}
        </button>
      </form>
    </div>
  );
};

export default HomeTexts;
