import { format } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import { JSDOM } from "jsdom";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { useState } from "react";
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

    let html;
    try {
      html = marked(content);
    } catch (error) {
      console.log("Error parsing markdown:", error);
    }

    const dom = new JSDOM(html);
    const firstImage = dom.window.document.querySelector("img");

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
    <div className="flex flex-col min-h-screen items-center bg-gray-50 pt-24">
      <main className="flex flex-col items-center py-12 text-center container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          The Cape Software Community hosts a monthly meetup in Cape Town, South
          Africa
        </h1>
        <section className="w-full mb-12 text-left">
          <h2 className="text-2xl font-semibold text-left text-gray-800 mb-4">
            Latest
          </h2>
          {posts.slice(0, 3).map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
              <a className="block p-6 bg-white rounded-lg border-gray-200 shadow-md hover:bg-gray-100">
                <div className="latest-item p-6 bg-white rounded-lg shadow-md flex flex-col gap-4 text-left">
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
                  <h3 className="text-xl font-bold">{post.data.title}</h3>
                  <p className="text-gray-700">
                    {post.data.description && post.data.description.length > 100
                      ? post.data.description.substring(0, 100) + "..."
                      : post.data.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {post.data.date && !isNaN(new Date(post.data.date))
                      ? format(new Date(post.data.date), "MMM dd, yyyy")
                      : "Invalid date"}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
