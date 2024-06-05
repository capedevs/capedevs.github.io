import { format } from "date-fns";
import { DiscussionEmbed } from "disqus-react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function getStaticPaths() {
  const contentDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(contentDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content", params.slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);

  return {
    props: {
      content: parsedMarkdown.content,
      data: parsedMarkdown.data,
    },
  };
}

export default function Post({ data, content }) {
  const disqusShortname = "https-capedevs-github-io";
  const disqusConfig = {
    url: `https://capedevs.github.io/posts/${data.slug}`,
    identifier: data.slug,
    title: data.title,
  };

  return (
    <div className="prose prose-lg mx-auto mt-8">
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.image} />
        <meta
          property="og:url"
          content={`https://capedevs.github.io/posts/${data.slug}`}
        />
      </Head>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p className="text-gray-500 text-sm">
        {data.date && !isNaN(new Date(data.date))
          ? format(new Date(data.date), "yyyy-MM-dd")
          : "Invalid date"}
      </p>
      <p>Author: {data.author}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
