"use client";
import React, { useState } from "react";
import { HiBars2 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext/AuthContext";

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

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-800">/||/\/</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="navlinks">
            <ul className="flex items-center gap-8">
              <li className="text-gray-800 hover:text-indigo-600 border-2 border-violet-800 rounded-full cursor-pointer px-4 py-2">
                Get in touch
              </li>

              {currentUser && (
                <li className="text-gray-800 hover:text-indigo-600 cursor-pointer">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              )}

              <li className="text-gray-800 hover:text-indigo-600 cursor-pointer">
                {currentUser ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
              <li className="ml-4">
                <button>
                  <HiBars2
                    className="text-2xl cursor-pointer text-gray-800 hover:text-indigo-600"
                    onClick={toggleModal}
                  />
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
