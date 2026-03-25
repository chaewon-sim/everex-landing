"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 400,
  color: "var(--cds-text-secondary)",
  letterSpacing: "0.32px",
  marginBottom: "0.5rem",
};

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ title: false, author: false, content: false });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ title: true, author: true, content: true });
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const post = await res.json();
      router.push(`/posts/${post.id}`);
    } else {
      setError("글 작성에 실패했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  function fieldBorder(field: keyof typeof touched) {
    return touched[field] && !form[field].trim()
      ? "1px solid var(--cds-support-error)"
      : "1px solid var(--cds-border-strong)";
  }

  return (
    <div style={{ maxWidth: "672px" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Link href="/" className="cds-breadcrumb-link">게시판</Link>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#525252">
          <path d="M11 8L6 13l-.7-.7L9.6 8 5.3 3.7 6 3l5 5z" />
        </svg>
        <span style={{ color: "var(--cds-text-secondary)", fontSize: "0.75rem", letterSpacing: "0.32px" }}>글쓰기</span>
      </nav>

      <h1 style={{ fontSize: "1.75rem", fontWeight: 300, marginBottom: "2rem", color: "var(--cds-text-primary)" }}>
        새 게시글 작성
      </h1>

      {/* Error notification */}
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--cds-support-error)" style={{ flexShrink: 0 }}>
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
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="제목을 입력하세요"
              className="cds-text-input"
              style={{ borderBottom: fieldBorder("title") }}
            />
            {touched.title && !form.title.trim() && (
              <p style={{ fontSize: "0.75rem", color: "var(--cds-support-error)", marginTop: "0.25rem" }}>
                제목을 입력해주세요.
              </p>
            )}
          </div>

          {/* Author */}
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--cds-border-subtle)" }}>
            <label style={labelStyle}>
              작성자 <span style={{ color: "var(--cds-support-error)" }}>*</span>
            </label>
            <input
              type="text"
              value={form.author}
              onBlur={() => setTouched((t) => ({ ...t, author: true }))}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="이름을 입력하세요"
              className="cds-text-input"
              style={{ borderBottom: fieldBorder("author") }}
            />
            {touched.author && !form.author.trim() && (
              <p style={{ fontSize: "0.75rem", color: "var(--cds-support-error)", marginTop: "0.25rem" }}>
                작성자를 입력해주세요.
              </p>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "1rem" }}>
            <label style={labelStyle}>
              내용 <span style={{ color: "var(--cds-support-error)" }}>*</span>
            </label>
            <textarea
              value={form.content}
              onBlur={() => setTouched((t) => ({ ...t, content: true }))}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="내용을 입력하세요"
              rows={12}
              className="cds-text-input"
              style={{ borderBottom: fieldBorder("content"), resize: "vertical", lineHeight: "1.6" }}
            />
            {touched.content && !form.content.trim() && (
              <p style={{ fontSize: "0.75rem", color: "var(--cds-support-error)", marginTop: "0.25rem" }}>
                내용을 입력해주세요.
              </p>
            )}
          </div>
        </div>

        {/* Button set */}
        <div style={{ display: "flex", borderTop: "1px solid var(--cds-border-subtle)" }}>
          <Link href="/" className="cds-btn cds-btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
            취소
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="cds-btn cds-btn-primary"
            style={{ flex: 1, justifyContent: "center", opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? "등록 중..." : "등록"}
            {!submitting && (
              <svg style={{ marginLeft: "0.5rem" }} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13 7H9V3H7v4H3v2h4v4h2V9h4z" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
