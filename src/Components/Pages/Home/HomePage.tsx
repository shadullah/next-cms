"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface TextData {
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

export default function HomePage() {
  const [data, setData] = useState<TextData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/text");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-center mb-8"
          >
            {data.hero.title}
          </motion.h1>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xl text-gray-600">{data.expert.paragraph}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.expert.expertiseTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800">{type}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                {data.overview.heading}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {data.overview.paragraph}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-blue-600">
                    {data.overview.statistics.projects}+
                  </h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-600">
                    {data.overview.statistics.awards}
                  </h3>
                  <p className="text-gray-600">Awards Won</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-96 rounded-lg"></div>{" "}
            {/* Placeholder for image */}
          </div>
        </div>
      </section>

      {/* Digital Partners Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {data.digitalPartners.title}
          </h2>
          <p className="text-xl mb-12 text-center max-w-4xl mx-auto">
            {data.digitalPartners.paragraph}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold">
                {data.digitalPartners.yearsInMarket}+
              </h3>
              <p>Years Experience</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">
                {data.digitalPartners.satisfiedCustomers}+
              </h3>
              <p>Happy Clients</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">
                {data.team.statistics.fiveStarReviews}+
              </h3>
              <p>5-Star Reviews</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">
                {data.team.statistics.expertCount}+
              </h3>
              <p>Expert Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl font-semibold mb-8">{data.team.paragraph}</p>
            <p className="text-lg text-gray-600">{data.team.story}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            {data.bigSection.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.services.serviceTypes.map((service) => (
              <div
                key={service._id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-8">{data.footer.paragraph}</p>
              <div className="space-y-4">
                <p>📞 {data.footer.contact.phoneNumber}</p>
                <p>📍 {data.footer.contact.address}</p>
                <p>✉️ {data.footer.contact.email}</p>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              {/* Contact form could go here */}
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p>Contact form coming soon...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
