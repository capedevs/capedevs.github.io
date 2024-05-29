import { format } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import { JSDOM } from "jsdom";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { useState } from "react";
import SubscribeButton from "../components/SubscribeButton";
const marked = require("marked");

export async function getStaticProps() {
  const contentDirectory = path.join(process.cwd(), "content");
  const filenames = fs
    .readdirSync(contentDirectory)
    .filter((filename) =>
      fs.statSync(path.join(contentDirectory, filename)).isFile()
    );

  const posts = filenames.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    console.log(content);

    let html;
    try {
      // Parse markdown to HTML
      html = marked(content);
    } catch (error) {
      console.log("Error parsing markdown:", error);
    }

    // Parse HTML to DOM
    const dom = new JSDOM(html);

    // First image extracted
    const firstImage = dom.window.document.querySelector("img");
    let firstImageSrc;
    if (firstImage) {
      firstImageSrc = path.join(
        path.dirname(filePath),
        firstImage.getAttribute("src")
      );
    }

    return {
      slug: filename.replace(/\.md$/, ""),
      data,
      content,
      firstImage: firstImage ? firstImage.src : null,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50">
      <header className="w-full py-6 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            <img src="/menu-icon.png" alt="Menu Icon" />
          </button>
          <nav
            className={`flex space-x-4 ${isOpen ? "block" : "hidden"} lg:flex`}
          >
            <a href="#" className="hover:underline font-semibold">
              Home
            </a>
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
          <div className="text-2xl font-bold flex-grow text-center">
            Cape Software Community
          </div>
          <div
            className={`flex space-x-4 items-center ${
              isOpen ? "block" : "hidden"
            } lg:flex`}
          >
            <a href="#" className="hover:underline font-semibold">
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
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center py-12 text-center container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          The Cape Software Community hosts a monthly meetup in Cape Town, South
          Africa
        </h1>
        <div className="relative w-full max-w-md mb-8">
          <input
            type="text"
            placeholder="Search posts, tags and authors"
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 0-1.41 1.41l4.8 4.8a1 1 0 0 0 1.41-1.41l-4.8-4.8zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          </svg>
        </div>
        {/* Latest Posts Section */}
        <section className="w-full mb-12 text-left">
          <h2 className="text-2xl font-semibold text-left text-gray-800 mb-4">
            Latest
          </h2>
          {posts.slice(0, 3).map((post) => (
            <div key={post.slug} className="text-left">
              {/* Individual Post */}
              <div className="latest-item p-6 bg-white rounded-lg shadow-md flex flex-col gap-4 text-left">
                {/* Featured Image */}
                {post.firstImage && (
                  <div className="mb-4">
                    <Image
                      src={post.firstImage}
                      alt={post.data.title}
                      width={500}
                      height={300}
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Post Title */}
                <h3 className="text-xl font-bold">
                  <Link href={`/posts/${post.slug}`} legacyBehavior>
                    <a className="hover:underline">{post.data.title}</a>
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-700">
                  {post.data.description && post.data.description.length > 100
                    ? post.data.description.substring(0, 100) + "..."
                    : post.data.description}
                </p>

                {/* Date */}
                <p className="text-gray-500 text-sm">
                  {post.data.date && !isNaN(new Date(post.data.date))
                    ? format(new Date(post.data.date), "yyyy/MM/dd")
                    : "Invalid date"}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="w-full py-6 bg-white shadow-t-md mt-auto">
        <div className="container mx-auto text-center px-4">
          <div className="text-xl font-bold mb-2">Cape Software Community</div>
          <p className="text-gray-600 mb-6">
            The Cape Software Community hosts a monthly meetup in Cape Town,
            South Africa
          </p>
          <div className="flex justify-center mb-4">
            <input
              type="email"
              placeholder="jamie@example.com"
              className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r">
              <img
                src="/user-logo.png"
                alt="User logo"
                className="h-4 w-4 mr-2 inline-block align-middle"
              />
              Subscribe
            </button>
          </div>
          <p className="text-gray-500">
            &copy; 2024 Cape Software Community. All rights reserved.
          </p>
        </div>
      </footer>

      <SubscribeButton />
    </div>
  );
}
