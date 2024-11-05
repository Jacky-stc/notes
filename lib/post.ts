import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export interface PostInfo{
  category:string,
  content:string,
  slug:string,
  title:string
}

export function getPostMetaData(){
  const categories = fs.readdirSync(postsDirectory);
  const allPosts:PostInfo[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(postsDirectory, category);
    const files = fs.readdirSync(categoryPath);

    files.forEach((file) => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      allPosts.push({
        category,
        slug: file.replace(/\.md$/, ''), // 去掉文件的 `.md` 後綴
        title: data.title || file.replace(/\.md$/, ''),
        content,
      });
    });
  });

  return allPosts;
}