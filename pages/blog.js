import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Blog = ({ posts, content }) => {
  return (
    <div className="max-w-3xl mx-auto pt-24 px-4">
      {/* Render the processed HTML content */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Display individual posts */}
      {posts.map((post, index) => (
        <div key={index} className="latest-item">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              {post.date
                ? new Date(post.date).toLocaleDateString()
                : "No date provided"}
            </p>
            <Link href={`/posts/${post.slug}`}>
              <a className="text-blue-500 no-underline hover:underline">
                Read more →
              </a>
            </Link>
          </div>
          {/* Render individual post content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "pages/posts");
  const fullPath = path.join(postsDirectory, "Blog.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content: markdownContent } = matter(fileContents);

  const posts = await Promise.all(
    (data.posts || []).map(async (post, index) => {
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(post.content);
      const contentHtml = processedContent.toString();

      return {
        id: index,
        title: post.title,
        date: post.date,
        slug: post.slug,
        content: contentHtml,
      };
    })
  );

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdownContent);
  const contentHtml = processedContent.toString();

  return {
    props: {
      posts,
      content: contentHtml,
    },
  };
}

export default Blog;
