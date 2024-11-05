import { getPostMetaData } from "@/lib/post";

export default function Home() {
  const posts = getPostMetaData()
  console.log(posts[6].content)
  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen flex flex-col">
      test
    </div>
  );
}
