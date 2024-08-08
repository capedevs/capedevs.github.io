import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="w-full h-16 bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 z-30">
          Cape Software Community
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden absolute top-4 right-4 z-30"
        >
          <Image
            src={isOpen ? '/icons8-circled-x-32.png' : '/icons8-menu-32.png'}
            alt={isOpen ? "Close Icon" : "Menu Icon"}
            width={32}
            height={32}
          />
        </button>

        {/* Mobile navigation */}
        <div
          className={`fixed inset-0 z-20 bg-white bg-opacity-90 backdrop-blur-md flex flex-col items-center transform transition-transform duration-200 ease-in-out ${
            isOpen ? "translate-y-16" : "-translate-y-full"
          } lg:hidden`}
        >
          <nav className="flex flex-col items-center space-y-4 mt-8">
            <Link
              href="/"
              className="border-b-2 border-transparent hover:border-current font-semibold"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <a
              href="https://www.meetup.com/cape-town-software-development-meetup/"
              className="border-b-2 border-transparent hover:border-current font-semibold"
              onClick={handleLinkClick}
            >
              Meetup
            </a>
            <a
              href="https://www.youtube.com/@CapeSoftwareCommunity"
              className="border-b-2 border-transparent hover:border-current font-semibold"
              onClick={handleLinkClick}
            >
              YouTube
            </a>
            <a
                href="https://github.com/capedevs"
                className="border-b-2 border-transparent hover:border-current font-semibold"
                onClick={handleLinkClick}
            >
                GitHub
            </a>
          </nav>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:block">
          <nav className="flex space-x-4">
            <Link href="/" className="border-b-2 border-transparent hover:border-current font-semibold">
              Home
            </Link>
            <a
              href="https://www.meetup.com/cape-town-software-development-meetup/"
              className="border-b-2 border-transparent hover:border-current font-semibold"
            >
              Meetup
            </a>
            <a
              href="https://www.youtube.com/@CapeSoftwareCommunity"
              className="border-b-2 border-transparent hover:border-current font-semibold"
            >
              YouTube
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
