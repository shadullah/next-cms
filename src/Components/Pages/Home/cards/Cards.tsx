"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  _id: string;
  title: string;
  img: string;
  latest: boolean;
  tag: string;
}

interface Tag {
  _id: string;
  tagName: string;
  slug: string;
}

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const cardsRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsResponse, tagsResponse] = await Promise.all([
          axios.get("/api/v1/cards"),
          axios.get("/api/v1/tags"),
        ]);
        setCards(cardsResponse.data.data);
        setTags(tagsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const element11 = cardsRef2.current;
    const container1 = containerRef2.current;

    if (!element11 || !container1 || loading) return;

    const animation = gsap.to(element11, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: container1,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading, cards]);

  const getTagName = (tagId: string) => {
    const tag = tags.find((t) => t._id === tagId);
    return tag?.tagName || "Unknown Tag";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={containerRef2}
      className="min-h-screen py-24 overflow-hidden bg-gray-100"
    >
      {/* Header Content */}

      {/* Cards Section */}
      <div ref={cardsRef2} className="flex gap-8 px-20 w-[200vw]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="w-[250px]">
            <h2 className="text-6xl font-bold mb-6">Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              A selection of our crafted work, built from scratch by our
              talented in-house team.
            </p>
          </div>
        </div>
        {cards.map((card) => (
          <div
            key={card._id}
            className="w-[500px] h-[500px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg relative group"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={card?.img}
                alt={card.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-8 text-white">
              {/* Header Section */}
              <div className="flex items-start justify-between">
                {card.latest && (
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20 transition-all duration-300">
                    Latest
                  </button>
                )}
              </div>

              {/* Bottom Section */}
              <div className="">
                <h3 className="text-3xl font-bold max-w-[70%] mb-12">
                  {card.title}
                </h3>
                <div className="space-y-3">
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20">
                    {getTagName(card.tag)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="max-w-7xl mx-auto px-4 py-20 flex justify-between items-center">
          <div className="w-[250px] space-y-6 text-center">
            <span className="text-5xl text-gray-500">View More</span>
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
              Case Studies
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
    </div>
  );
};

export default Cards;
