import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../components/Layout";

const MarkdownContent = ({ markdown }) => {
  return (
    <Layout>
      <div className="prose prose-lg mx-auto mt-8 text-left">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default MarkdownContent;
