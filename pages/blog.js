import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Blog = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto pt-24 px-4">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Link key={index} href={`/posts/${post.slug}`} legacyBehavior>
            <a className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p>{post.description}</p>
              <div className="flex justify-between items-center text-gray-500 mb-4">
                <p>
                  {post.date
                    ? new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "No date provided"}
                </p>
                <span className="text-blue-500 no-underline hover:underline">
                  Read more →
                </span>
              </div>
              <p className="text-gray-700">{post.excerpt}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "content");

  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const { data, content } = matter(fileContents);

      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content);
      const contentHtml = processedContent.toString();

      return {
        title: data.title || "Untitled",
        date: data.date || null,
        slug: filename.replace(/\.md$/, ""),
        excerpt: data.excerpt || "",
        description: data.description || "",
        content: contentHtml,
      };
    })
  );

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
