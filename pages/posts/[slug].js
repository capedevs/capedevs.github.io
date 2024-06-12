import { format } from "date-fns";
import { DiscussionEmbed } from "disqus-react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
import ReactMarkdown from "react-markdown";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
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

  const shareUrl = `https://capedevs.github.io/posts/${data.slug}`;

  // Split the content at the first "READ MORE" section
  const readMoreMarker = "\n\n---\n\nREAD MORE\n\n---\n\n";
  const [contentBeforeReadMore, contentAfterReadMore] = content.split(
    readMoreMarker,
    2
  );

  return (
    <div className="prose prose-lg max-w-3xl mx-auto pt-24 px-4">
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

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {contentBeforeReadMore}
      </ReactMarkdown>
      <div className="social-share-buttons flex justify-center space-x-4 mt-8">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>

      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

      {/* Render the "READ MORE" marker */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {"\n\n---\n\nREAD MORE\n\n---\n\n"}
      </ReactMarkdown>

      {contentAfterReadMore && (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contentAfterReadMore}
        </ReactMarkdown>
      )}
    </div>
  );
}
