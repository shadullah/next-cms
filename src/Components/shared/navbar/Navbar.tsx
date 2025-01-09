"use client";
import React, { useEffect, useState } from "react";
import { HiBars2 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext/AuthContext";
import gsap from "gsap";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

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

  // const titleRef = useRef(null);

  // useEffect(() => {
  //   if (titleRef.current) {
  //     // First, set initial state
  //     gsap.set(titleRef.current, {
  //       opacity: 0,
  //       y: 50, // Start 100px below final position
  //     });

  //     // Then animate
  //     gsap.to(titleRef.current, {
  //       opacity: 1,
  //       y: 0,
  //       duration: 1.5,
  //       ease: "power4.out",
  //       delay: 0.2, // Small delay to ensure everything is ready
  //     });
  //   }
  // }, []);

  return (
    <nav className="fixed top-0 w-full bg-white h-[120px] z-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-800">/||/\/</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="navlinks">
            <ul className="flex items-center gap-8">
              <li>
                <button className="button text-gray-800 hover:text-indigo-600 border-[0.5px] border-violet-800 rounded-full cursor-pointer px-6 py-2 overflow-hidden">
                  <span className="inline-block">Get in touch</span>
                </button>
              </li>

              {currentUser && (
                <li>
                  <button className=" text-gray-800 hover:text-indigo-600 overflow-hidden">
                    <span className="inline-block">
                      <Link href="/dashboard">Dashboard</Link>
                    </span>
                  </button>
                </li>
              )}

              <li>
                {currentUser ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <button className=" text-gray-800 hover:text-indigo-600 overflow-hidden">
                    <Link href="/login">Login</Link>
                  </button>
                )}
              </li>

              <li className="ml-4">
                <button className="button border-[0.5px] border-indigo-600 h-12 w-12 p-3 rounded-full overflow-hidden">
                  <span className="inline-block">
                    <HiBars2
                      className="text-2xl cursor-pointer text-gray-800 hover:text-indigo-600"
                      onClick={toggleModal}
                    />
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Navigation
              </h2>
              <button onClick={toggleModal}>
                <IoMdClose className="text-2xl text-gray-500 hover:text-indigo-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/case-studies"
                    className="block py-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    onClick={toggleModal}
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/agency"
                    className="block py-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    onClick={toggleModal}
                  >
                    Our Agency
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    onClick={toggleModal}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="block py-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    onClick={toggleModal}
                  >
                    News
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
