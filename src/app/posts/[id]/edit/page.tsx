"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 400,
  color: "var(--cds-text-secondary)",
  letterSpacing: "0.32px",
  marginBottom: "0.5rem",
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({ title: data.title, author: data.author, content: data.content });
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    setSubmitting(true);
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push(`/posts/${id}`);
    } else {
      setError("수정에 실패했습니다.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: "672px" }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ height: "4rem", background: "#e0e0e0", marginBottom: "2px", opacity: 1 - i * 0.2 }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "672px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Link href="/" className="cds-breadcrumb-link">게시판</Link>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#525252">
          <path d="M11 8L6 13l-.7-.7L9.6 8 5.3 3.7 6 3l5 5z" />
        </svg>
        <Link href={`/posts/${id}`} className="cds-breadcrumb-link">상세보기</Link>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#525252">
          <path d="M11 8L6 13l-.7-.7L9.6 8 5.3 3.7 6 3l5 5z" />
        </svg>
        <span style={{ color: "var(--cds-text-secondary)", fontSize: "0.75rem", letterSpacing: "0.32px" }}>수정</span>
      </nav>

      <h1 style={{ fontSize: "1.75rem", fontWeight: 300, marginBottom: "2rem", color: "var(--cds-text-primary)" }}>
        게시글 수정
      </h1>

      {error && (
        <div
          style={{
            background: "#fff1f1",
            borderLeft: "3px solid var(--cds-support-error)",
            padding: "0.875rem 1rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--cds-support-error)">
            <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm-.5 3h1v5h-1V4zm.5 8.2c-.4 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.4.8-.8.8z" />
          </svg>
          <span style={{ fontSize: "0.875rem", color: "var(--cds-support-error)" }}>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ background: "var(--cds-layer)", borderTop: "1px solid var(--cds-border-subtle)" }}>
          {/* Title */}
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--cds-border-subtle)" }}>
            <label style={labelStyle}>
              제목 <span style={{ color: "var(--cds-support-error)" }}>*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="cds-text-input"
            />
          </div>

          {/* Author */}
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--cds-border-subtle)" }}>
            <label style={labelStyle}>
              작성자 <span style={{ color: "var(--cds-support-error)" }}>*</span>
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="cds-text-input"
            />
          </div>

          {/* Content */}
          <div style={{ padding: "1rem" }}>
            <label style={labelStyle}>
              내용 <span style={{ color: "var(--cds-support-error)" }}>*</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="cds-text-input"
              style={{ resize: "vertical", lineHeight: "1.6" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", borderTop: "1px solid var(--cds-border-subtle)" }}>
          <Link href={`/posts/${id}`} className="cds-btn cds-btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
            취소
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="cds-btn cds-btn-primary"
            style={{ flex: 1, justifyContent: "center", opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
