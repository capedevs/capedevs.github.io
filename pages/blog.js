import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
import Link

const Blog = ({ posts, content }) => {
  return (
    <div className="p-4">
      {/* Render the processed HTML content */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Display individual posts */}
      {posts.map((post, index) => (
        <div key={index} className="latest-item">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="text-gray-500 flex justify-between items-center">
            {post.date}
            <Link href={`/posts/${post.slug}`}>
              <a className="text-blue-500 hover:underline">Read more →</a>
            </Link>
          </p>
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

  // Parse metadata using gray-matter
  const { data, content: markdownContent } = matter(fileContents);

  // Initialize posts array (empty if undefined)
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

  // Process the main content
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
