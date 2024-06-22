import { LinkPreview } from "react-link-preview";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../components/Layout";

const MarkdownContent = ({ markdown }) => {
  return (
    <Layout>
      <div className="prose prose-lg mx-auto mt-8 text-left">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => <LinkPreview url={props.href} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default MarkdownContent;
