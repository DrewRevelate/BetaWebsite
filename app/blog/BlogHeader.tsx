'use client';

import BlogHero from '@/components/theme/heroes/examples/BlogHero';

export interface BlogHeaderProps {
  title: string;
  description: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  categories: string[];
}

const BlogHeader = ({ 
  title, 
  description, 
  coverImage, 
  author, 
  date, 
  readTime, 
  categories 
}: BlogHeaderProps) => {
  return (
    <BlogHero
      title={title}
      description={description}
      coverImage={coverImage}
      author={author}
      date={date}
      readTime={readTime}
      categories={categories}
    />
  );
};

export default BlogHeader;
