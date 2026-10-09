import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";
export const alt = "Centex Insurance Solutions — Texas insurance news";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#092d4b", color: "white", padding: 70, borderBottom: "20px solid #1685cb" }}><div style={{ display: "flex", fontSize: 25, color: "#96d4ff" }}>CENTEX INSURANCE SOLUTIONS / JOURNAL</div><div style={{ display: "flex", fontSize: 64, lineHeight: 1.1 }}>{post?.title || "Texas insurance news & insights"}</div><div style={{ display: "flex", fontSize: 25 }}>Round Rock roots. Texas-wide perspective.</div></div>, size);
}
