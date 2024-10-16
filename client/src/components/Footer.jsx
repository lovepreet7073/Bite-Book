import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='bg-[#01161e]'>
          <footer className="sticky bottom-0 w-full pt-8 pb-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap text-left lg:text-left">
        <div className="w-full lg:w-6/12 px-4">
          <h4 className="text-3xl fonat-semibold text-gray-200">
            Let's keep in touch!
          </h4>
          <h5 className="text-lg mt-0 mb-2 text-gray-200">
            Find us on any of these platforms, we respond 1-2 business days.
          </h5>
          <div className="mt-6 lg:mb-0 mb-6">
            <button
              className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <FaTwitter size={25} className='text-center mx-auto '/>
            </button>
            <button
              className="bg-white text-blue-700  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <FaFacebookSquare size={25} className='text-center mx-auto '/>
            </button>
            <button
              className="bg-white text-red-700 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <FaYoutube size={25} className='text-center mx-auto '/>
            </button>
            <button
              className="bg-white text-gray-700 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
             <FaGithub  size={25} className='text-center mx-auto '/>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="flex flex-wrap items-top mb-6">
            <div className="w-full lg:w-4/12 px-4 ml-auto">
              <span className="block uppercase text-gray-200 text-sm font-semibold mb-2">
                Useful Links
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    className="text-gray-200 hover:text-gray-200 font-semibold block pb-2 text-sm"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-200 hover:text-gray-200 font-semibold block pb-2 text-sm"
                    href="https://blog.creative-tim.com?ref=njs-profile"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-200 hover:text-gray-200 font-semibold block pb-2 text-sm"
                    href="https://www.github.com/creativetimofficial?ref=njs-profile"
                  >
                    Tips
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-200 hover:text-gray-200 font-semibold block pb-2 text-sm"
                    href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                  >
                Meals
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <span className="block uppercase text-gray-200 text-sm font-semibold mb-2">
                Other Resources
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                  >
                    MIT License
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="https://creative-tim.com/terms?ref=njs-profile"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="https://creative-tim.com/privacy?ref=njs-profile"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-200 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="https://creative-tim.com/contact-us?ref=njs-profile"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-blueGray-300 w-full" />
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-gray-200 font-semibold py-1">
            Copyright © <span id="get-current-year">2024</span>
            <a
              href="https://www.creative-tim.com/product/notus-js"
              className="text-gray-200 hover:text-gray-800"
              target="_blank"
            >
              {" "}
              Book Bite
            </a>
            <a
              href="https://www.creative-tim.com?ref=njs-profile"
              className="text-gray-200 hover:text-blueGray-800"
            >
            
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer