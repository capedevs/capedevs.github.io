import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Blog = ({ posts, content }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
      {posts.map((post, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-500 mb-2">{post.date}</p>
          <div className="flex justify-between items-center">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <a
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "pages/posts");
  const fullPath = path.join(postsDirectory, "blog.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matter used to parse the post metadata section
  const { data, content: markdownContent } = matter(fileContents);

  // (initialize to an empty array if undefined)
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
