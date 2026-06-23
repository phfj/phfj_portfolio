import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paul Holmes — software developer, lifelong learner, and advocate for self-education and curiosity in tech.",
};

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>
        I&apos;m Paul Holmes, a software developer passionate about building
        things, sharing what I learn, and sparking curiosity in others.
      </p>
      <p>
        This site is my portfolio of work and my blog — a place to document my
        journey, explore ideas, and hopefully inspire others to teach themselves
        and stay curious.
      </p>
      <p>
        I believe the best developers are self-taught, endlessly curious, and
        generous with their knowledge. That&apos;s what this site is about.
      </p>
    </div>
  );
}
