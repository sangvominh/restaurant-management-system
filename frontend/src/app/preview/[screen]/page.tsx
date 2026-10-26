import { notFound } from "next/navigation";
import PreviewApp from "@/components/preview/app";
import { screens } from "@/components/preview/data";
export function generateStaticParams() {
  return screens.map((s) => ({ screen: s.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ screen: string }>;
}) {
  const { screen } = await params;
  if (!screens.some((s) => s.id === screen)) notFound();
  return <PreviewApp screen={screen} />;
}
