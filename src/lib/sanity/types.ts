import type { PortableTextBlock } from "@portabletext/react";

export interface Topic {
  _id: string;
  name: string;
  slug: { current: string };
}

export type Category = "Software" | "OSS" | "Talk" | "Writing";

export interface SanityImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface SanityImageAsset {
  _ref?: string;
  url?: string;
  metadata?: {
    dimensions?: SanityImageDimensions;
    lqip?: string;
  };
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  topics?: Topic[];
  summary?: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  publishedAt: string;
  updatedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: SanityImage;
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: Category;
  topics?: Topic[];
  summary?: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  publishedAt: string;
  techStack?: string[];
  whatILearned?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: SanityImage;
  };
}

export interface TimelineEvent {
  _id: string;
  type: "work" | "education" | "project" | "writing";
  title: string;
  organization: string;
  startDate: string; // YYYY-MM
  endDate?: string | null; // YYYY-MM, or null/undefined for Present
  description: string;
  skills: string[];
  links?: { label: string; url: string }[];
  projectRef?: { _ref: string; _type: "reference" };
  postRef?: { _ref: string; _type: "reference" };
}
