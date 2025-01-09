"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeedbackType {
  _id: string;
  description: string;
  compnyName: string;
  name: string;
  imgFeed: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(true);
  const feedbacksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/api/v1/feedback");
        setFeedbacks(response.data.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (!feedbacksRef.current || loading) return;

    const feedbackCards = gsap.utils.toArray<HTMLElement>(".feedback-card");

    feedbackCards.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 100,
        rotateX: 45,
        transformPerspective: 800,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        end: "top center",
        scrub: 1,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            opacity: 0,
            y: 100,
            rotateX: 45,
            duration: 1,
            ease: "power2.in",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loading, feedbacks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative bg-gray-900 py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h1 className="text-6xl mb-12 text-white font-bold">
            Client Feedback
          </h1>
          <p className="text-2xl mb-12 text-gray-100">
            We&apos;re collaborators - We build tight-knit partnerships with our
            clients
          </p>
        </div>

        <div
          ref={feedbacksRef}
          className="grid grid-cols-1 md:grid-cols-1 gap-32 w-[1000px] mx-auto"
        >
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="feedback-card bg-gray-800/50 backdrop-blur-sm px-16 py-24 rounded-2xl border border-gray-700"
            >
              {/* Description */}
              <p className="text-3xl text-white mb-16 font-bold">
                &quot;{feedback.description}&quot;
              </p>

              {/* Profile Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Profile Picture */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={feedback.imgFeed}
                      alt={feedback.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Name */}
                  <h3 className="text-gray-500 text-lg ">{feedback.name}</h3>
                </div>
                {/* Company Name */}
                <span className="text-indigo-400 text-xl">
                  {feedback.compnyName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
