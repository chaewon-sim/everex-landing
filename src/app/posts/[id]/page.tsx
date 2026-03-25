"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  views: number;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    setDeleting(true);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{ maxWidth: "800px" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: i === 0 ? "4rem" : "2rem", background: "#e0e0e0", marginBottom: "2px", opacity: 1 - i * 0.2 }} />
        ))}
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <p style={{ color: "var(--cds-text-secondary)", marginBottom: "1rem" }}>게시글을 찾을 수 없습니다.</p>
        <Link href="/" className="cds-btn cds-btn-ghost">← 목록으로</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Link href="/" className="cds-breadcrumb-link">게시판</Link>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#525252">
          <path d="M11 8L6 13l-.7-.7L9.6 8 5.3 3.7 6 3l5 5z" />
        </svg>
        <span style={{ color: "var(--cds-text-secondary)", fontSize: "0.75rem", letterSpacing: "0.32px" }}>상세보기</span>
      </nav>

      <article style={{ background: "var(--cds-layer)", borderTop: "3px solid var(--cds-interactive)" }}>
        {/* Header */}
        <header style={{ padding: "1.5rem", borderBottom: "1px solid var(--cds-border-subtle)" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--cds-text-primary)",
              lineHeight: 1.28572,
              marginBottom: "1.25rem",
            }}
          >
            {post.title}
          </h1>

          <dl style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {[
              { label: "작성자", value: post.author, mono: false },
              { label: "작성일", value: formatDate(post.createdAt), mono: true },
              { label: "조회수", value: String(post.views), mono: true },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <dt style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--cds-text-secondary)", letterSpacing: "0.32px", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  {label}
                </dt>
                <dd style={{ fontSize: "0.875rem", color: "var(--cds-text-primary)", fontFamily: mono ? "IBM Plex Mono, monospace" : undefined }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Body */}
        <div
          style={{
            padding: "2rem 1.5rem",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--cds-text-primary)",
            whiteSpace: "pre-wrap",
            minHeight: "16rem",
          }}
        >
          {post.content}
        </div>

        {/* Actions */}
        <div
          style={{
            borderTop: "1px solid var(--cds-border-subtle)",
            padding: "1rem 1.5rem",
            display: "flex",
            gap: "1px",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/" className="cds-btn cds-btn-ghost" style={{ padding: "0.875rem 1rem" }}>
            목록
          </Link>
          <Link href={`/posts/${id}/edit`} className="cds-btn cds-btn-secondary" style={{ padding: "0.875rem 1rem" }}>
            수정
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="cds-btn cds-btn-danger"
            style={{ padding: "0.875rem 1rem", opacity: deleting ? 0.5 : 1 }}
          >
            {deleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </article>
    </div>
  );
}
