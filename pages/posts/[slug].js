import { format } from "date-fns";
import { DiscussionEmbed } from "disqus-react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import Image from "next/image";
import path from "path";
import { FaUser } from "react-icons/fa";
import dynamic from "next/dynamic";
import Link from "next/link";
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

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

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

  const contentDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(contentDirectory);

  const otherPosts = filenames
    .filter((filename) => filename !== params.slug + ".md")
    .map((filename) => {
      const markdownWithMetadata = fs
        .readFileSync(path.join("content", filename))
        .toString();
      const parsedMarkdown = matter(markdownWithMetadata);
      return {
        slug: filename.replace(/\.md$/, ""),
        data: parsedMarkdown.data,
      };
    });

  return {
    props: {
      content: parsedMarkdown.content,
      data: parsedMarkdown.data,
      otherPosts: otherPosts.slice(0, 3),
    },
  };
}

export default function Post({ data, content, otherPosts }) {
  const disqusShortname = "https-capedevs-github-io";
  const disqusConfig = {
    url: `https://capedevs.github.io/posts/${data.slug}`,
    identifier: data.slug,
    title: data.title,
  };

  const shareUrl = `https://capedevs.github.io/posts/${data.slug}`;

  // Extract images from content
  const imagePattern = /!\[.*?\]\((.*?)\)/g;
  const imageMatches = content.match(imagePattern);
  const images = imageMatches
    ? imageMatches.map((match) => {
        const urlMatch = match.match(/\((.*?)\)/);
        return urlMatch ? urlMatch[1] : null;
      }).filter((url) => url !== null)
    : [];

  // Remove images from content for markdown rendering
  const contentWithoutImages = content.replace(imagePattern, '');

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
          ? format(new Date(data.date), "MMM dd, yyyy")
          : "Invalid date"}
      </p>
      <p className="flex items-center">
        <FaUser className="mr-2" /> {data.author}
      </p>

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentWithoutImages}</ReactMarkdown>

      {images.length > 0 && (
        <div className="gallery-grid mt-8">
          {images.map((src, index) => (
            <div key={index} className="gallery-item">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={500}
                height={300}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      )}

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

      <section className="w-full mb-12 text-left">
        <h2 className="text-2xl font-semibold text-left text-gray-800 mb-4">
          READ MORE
        </h2>
        {otherPosts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
            <a className="block p-6 bg-white rounded-lg border-gray-200 shadow-md hover:bg-gray-100 mb-6 no-underline">
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
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
}
