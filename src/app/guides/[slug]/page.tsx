import type { Metadata } from "next";
import { guides } from "@/lib/types";
import { notFound } from "next/navigation";
import GuideContent from "./guide-content";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — buildcraft`,
    description: guide.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guideIndex = guides.findIndex((g) => g.slug === slug);
  if (guideIndex === -1) notFound();

  const guide = guides[guideIndex];
  const prev = guideIndex > 0 ? guides[guideIndex - 1] : null;
  const next = guideIndex < guides.length - 1 ? guides[guideIndex + 1] : null;

  return <GuideContent guide={guide} prev={prev} next={next} />;
}
