import { Metadata } from "next";
import BlogDetailsPage from "./BlogDetailsClient";

export const metadata: Metadata = {
  title: "Business Communication Blog Bangladesh | aicall.bd",
  description:
    "Practical guides on Cloud PBX, IP calling, business phone systems, voice campaigns, customer communication, and call center technology.",
};

const BlogDetails = () => {
  return (
    <div>
      <BlogDetailsPage />
    </div>
  );
};

export default BlogDetails;
