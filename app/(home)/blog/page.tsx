import { Metadata } from "next";
import BlogClient from "./BlogClient";


export const metadata: Metadata = {
  title: "Business Communication Blog Bangladesh | aicall.bd",
  description:
    "Practical guides on Cloud PBX, IP calling, business phone systems, voice campaigns, customer communication, and call center technology.",
};

const Blog = () => {
  return (
    <div>
      <BlogClient />
    </div>
  );
};

export default Blog;
