"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { SiBmw, SiBosch, SiItvx } from "react-icons/si";
import { FcBbc } from "react-icons/fc";
import aws from "../../../../public/AW_Team_01-2200x1650.jpg";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDeezer } from "react-icons/fa";
import BigText from "./Bigtext/BigText";
import Footer from "@/Components/shared/footer/Footer";

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

gsap.registerPlugin(ScrollTrigger);

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

  const titleRef = useRef(null);

  // heading effect
  useEffect(() => {
    if (titleRef.current && data) {
      // First, set initial state
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50, // Start 100px below final position
      });

      // Then animate
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2, // Small delay to ensure everything is ready
      });
    }
  }, [data]);

  // btn effect
  useEffect(() => {
    // Get all buttons with the class 'button'
    const buttons = gsap.utils.toArray<HTMLElement>(".button");

    // Create an array to store cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    buttons.forEach((button: HTMLElement) => {
      const span = button.querySelector<HTMLElement>("span");
      if (!span) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(span, {
        duration: 0.2,
        yPercent: -150,
        ease: "power2.in",
      })
        .set(span, {
          yPercent: 150,
        })
        .to(span, {
          duration: 0.2,
          yPercent: 0,
        });

      const handleEnter = () => tl.play(0);

      button.addEventListener("mouseenter", handleEnter);

      // Store cleanup function
      cleanupFunctions.push(() => {
        button.removeEventListener("mouseenter", handleEnter);
        tl.kill();
      });
    });

    // Return cleanup function
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true, // Smooth scrubbing effect
      },
    });

    tl.fromTo(
      imageRef.current.querySelector("img"),
      {
        y: 0,
        scale: 1,
      },
      {
        y: 100, // Adjust this value to control parallax intensity
        scale: 1.1,
        duration: 1,
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
    <div className="">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto mt-48">
        <h1 ref={titleRef} className="text-8xl font-bold">
          {data.hero.title}
        </h1>
        <div>
          <div className="flex items-center justify-between mt-36">
            <div className="flex items-center space-x-4 w-1/2">
              <div className="num px-6 py-6 bg-gray-900 text-white rounded-full text-3xl">
                15
              </div>
              <div className="text-2xl text-gray-600">Website Awards</div>
            </div>
            <div className="flex items-center w-1/2 space-x-4">
              <p className="text-2xl mr-2">
                We build engaging websites, brands & innovative e-commerce
                solutions.
              </p>
              <button className="bg-indigo-600 text-white px-8 py-5 text-2xl font-medium rounded-full text-nowrap">
                {" "}
                <span className="inline-block">Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* cards section */}
      <section className=" my-12"></section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto border-b-[0.5px] border-gray-600">
          <div className=" text-white  container px-4">
            <div className="mb-6">
              <p className="text-2xl ">{data.expert.paragraph}</p>
            </div>
            <div className="mb-10">
              {data.expert.expertiseTypes.map((type, index) => (
                <div key={index} className="py-6 rounded-lg shadow-lg">
                  <h3 className="text-6xl font-bold ">{type}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-gray-950 py-4 pb-24">
        <div className="max-w-7xl container mx-auto px-4">
          <div className="">
            <div>
              <div className="flex items-center justify-between mb-16">
                <div className="w-1/2">
                  <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent py-2">
                    {data.overview.heading}
                  </h2>

                  <p className="text-xl text-white mb-8 pr-24">
                    {data.overview.paragraph}
                  </p>
                </div>
                <div className="w-1/2 flex justify-end items-center space-x-4 mt-32">
                  <div className="border-[1px] border-indigo-600 rounded-full">
                    <h3 className="text-2xl font-bold text-white px-12 py-4">
                      {data.overview.statistics.projects}+{" "}
                      <span className="">Projects</span>
                    </h3>
                  </div>
                  <div className="border-[1px] border-indigo-600 rounded-full">
                    <h3 className="text-2xl font-bold text-white px-12 py-4">
                      {data.overview.statistics.awards}+{" "}
                      <span className="">Awards</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Partners Section */}
      <section className="py-36 text-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="w-1/2 mr-6">
              <h2 className="text-6xl font-semibold mb-8">
                {data.digitalPartners.title}
              </h2>
              <p className="text-2xl mb-24 mr-6">
                {data.digitalPartners.paragraph}
              </p>
              <div className="flex items-center">
                {/* Stacked Icons */}
                <div className="flex -space-x-4">
                  {" "}
                  {/* Negative margin for overlap */}
                  <div className="bg-gray-800 p-3 rounded-full z-10 relative border-2 border-white">
                    <FcBbc className="text-white text-2xl" />
                  </div>
                  <div className="bg-gray-800 p-3 rounded-full z-20 relative border-2 border-white">
                    <SiBmw className="text-white text-2xl" />
                  </div>
                  <div className="bg-gray-800 p-3 rounded-full z-30 relative border-2 border-white">
                    <SiBosch className="text-white text-2xl" />
                  </div>
                  {/* Add more icons with decreasing z-index if needed */}
                </div>

                {/* Text */}
                <p className="text-2xl text-gray-500 ml-6">
                  Brands who&apos;ve trusted us...
                </p>
              </div>
            </div>
            <div className="w-1/2 mt-56">
              <div className="flex items-center text-center bg-gray-200 py-12 rounded-3xl px-12">
                <div className="w-1/2">
                  <h3 className="text-5xl font-bold mb-6">
                    {data.digitalPartners.yearsInMarket}
                  </h3>
                  <p className="text-2xl">Years on the market</p>
                </div>
                <div className="border-[0.1px] border-gray-500 h-48 w-[0.1px]"></div>
                <div className="w-1/2">
                  <h3 className="text-5xl font-bold mb-6">
                    {data.digitalPartners.satisfiedCustomers}
                  </h3>
                  <p className="text-2xl">Satisfied Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* img section */}
      <section className="max-w-7xl mx-auto">
        <section className="relative w-full h-[80vh] overflow-hidden">
          <div ref={imageRef} className="w-full h-full">
            <Image
              className="object-cover w-full h-full rounded-3xl"
              src={aws}
              alt="aws"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </section>
        <div className="my-24 ">
          <p className="text-5xl font-bold mr-48 leading-relaxed">
            From ambitious startups to global companies, we partner with great
            businesses and industry leaders.
          </p>
        </div>
        <div className="flex justify-between items-center space-x-8 text-5xl mb-24">
          <div>
            <SiItvx />
          </div>
          <div>
            <SiBmw />
          </div>
          <div>
            <FcBbc />
          </div>
          <div>
            <FaDeezer />
          </div>
          <div>
            <SiBosch />
          </div>
        </div>
      </section>

      {/* text scroll section */}
      <BigText />

      {/* Team Section */}
      <section className="max-w-7xl mx-auto my-24">
        <div className="flex items-center py-16">
          <div className="w-1/2">
            <p className="text-5xl font-bold mb-16">{data.team.paragraph}</p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-5xl font-bold mb-6">
                  {data.team.statistics.fiveStarReviews}
                </p>
                <p className="text-2xl">Five-Star Reviews</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-6">
                  {data.team.statistics.expertCount}
                </p>
                <p className="text-2xl">In-House Experts</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 mt-48">
            <p className="text-2xl mr-12 text-gray-800">{data.team.story}</p>
          </div>
        </div>
      </section>

      {/* bg text section */}
      <section className="max-w-7xl mx-auto my-24">
        <div className="flex flex-col items-center justify-center text-8xl font-bold leading-snug">
          <h1>Crafting digital</h1>
          <h1 className="text-right bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent ml-48">
            experiences
          </h1>
          <h1 className="text-left mr-36">since 2004</h1>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto">
        <div className="py-24">
          <div className="flex items-center">
            <div className="w-1/2">
              <h2 className="text-6xl font-semibold mb-12">
                We&apos;re good at
              </h2>
              <p className="mb-12">Services</p>
              <div className="">
                {data.services.serviceTypes.map((service) => (
                  <div key={service._id} className="">
                    <h3 className="text-3xl font-semibold mb-4">
                      {service.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 mt-48">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white px-14 py-12 rounded-3xl">
                <p className="text-4xl mb-10 font-semibold">
                  Let&apos;s start with a conversation about how we can help
                  you! Get in touch, we&apos;re a nice bunch.
                </p>
                <div className="flex items-center space-x-4">
                  <div>
                    <button className="text-gray-800 bg-gray-200 text-2xl px-10 py-4 rounded-full">
                      Let&apos;s talk
                    </button>
                  </div>
                  <div>
                    <button className="border-[1px] text-2xl px-10 py-4 rounded-full">
                      0207 112 82 85
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h1 className="text-5xl mb-12">Client Feedback</h1>
          <p className="text-2xl mb-12">
            We&apos;re collaborators - We build tight-knit partnerships with our
            clients
          </p>
        </div>
      </section>

      {/* Footer Contact Section */}
      <Footer data={data} />
    </div>
  );
}
