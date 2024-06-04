import "/styles/global.css";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout"; // Import the Layout component

function MyApp({ Component, pageProps }) {
  return (
    <Layout> {/* Use the Layout component to wrap the Component */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;