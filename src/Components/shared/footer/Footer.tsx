import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { SiAwwwards } from "react-icons/si";

interface TextData {
  footer: {
    contact: {
      phoneNumber: string;
      address: string;
      email: string;
    };
    paragraph: string;
  };
}

interface FooterProps {
  data: TextData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <div>
      <section className="py-32 max-w-7xl mx-auto">
        <div className="">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-4xl mb-24 font-bold leading-snug">
                {data.footer.paragraph}
              </p>
              <p className="text-sm mb-6">Get in touch</p>
              <div className="space-y-4 mb-16 font-bold">
                <p className="text-xl">{data.footer.contact.phoneNumber}</p>
                <p className="text-xl">{data.footer.contact.email}</p>
                <p className="text-xl">{data.footer.contact.address}</p>
              </div>
              <p className="text-gray-500">
                &copy; {new Date().getFullYear()} Artistweb Ltd . All rights
                reserved.{" "}
              </p>
            </div>
            <div className="p-8 rounded-lg">
              <div className="bg-gray-800 px-12 py-6 text-2xl rounded-3xl text-white flex  justify-between mb-12">
                <div>
                  <p>Follow us</p>
                </div>
                <div className="flex items-center space-x-8">
                  <p>
                    <FaInstagram />
                  </p>
                  <p>
                    <FaFacebook />
                  </p>
                  <p>
                    <FaX />
                  </p>
                  <p>
                    <SiAwwwards />
                  </p>
                </div>
              </div>
              <div className="text-gray-900 bg-gray-200 rounded-3xl p-12 text-center">
                <h1 className="mb-6 text-4xl font-bold">
                  Let&apos;s get started
                </h1>
                <p className="mb-10">
                  we&apos;d love to hear about your project
                </p>
                <button className="bg-gradient-to-l from-indigo-600 to-indigo-800 px-24 py-6 text-white rounded-full text-3xl">
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
