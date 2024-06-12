import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-6 bg-white shadow-md text-center">
      <div className="container mx-auto flex justify-between items-center px-4 relative">
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <img src="/menu-icon.png" alt="Menu Icon" />
        </button>
        <nav
          className={`flex space-x-4 ${isOpen ? "block" : "hidden"} lg:flex`}
        >
          <Link href="/" className="hover:underline font-semibold">
            Home
          </Link>
          <a
            href="https://www.meetup.com/cape-town-software-development-meetup/"
            className="hover:underline font-semibold"
          >
            Meetup
          </a>
          <a
            href="https://www.youtube.com/@CapeSoftwareCommunity"
            className="hover:underline font-semibold"
          >
            YouTube
          </a>
          <Link href="/blog" className="hover:underline font-semibold">
            Blog
          </Link>
        </nav>
        <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Cape Software Community
        </div>
        <div
          className={`flex space-x-4 items-center ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          {/*<a href="#" className="hover:underline font-semibold">
            Sign in
          </a>
           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <img
              src="/user-logo.png"
              alt="User logo"
              className="h-4 w-4 mr-2 inline-block align-middle"
            />
            Subscribe
          </button>
        */}
        </div>
      </div>
    </header>
  );
}
