export interface Topic {
  _id: string;
  name: string;
  slug: { current: string };
}

export type Category = "Software" | "OSS" | "Talk" | "Writing";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  topics?: Topic[];
  summary?: string;
  body?: unknown;
  coverImage?: { asset: { _ref: string } };
  publishedAt: string;
  updatedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: { asset: { _ref: string } };
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: Category;
  topics?: Topic[];
  summary?: string;
  body?: unknown;
  coverImage?: { asset: { _ref: string } };
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  publishedAt: string;
  techStack?: string[];
  whatILearned?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: { asset: { _ref: string } };
  };
}
