"use client";

import { useState } from "react";
import Link from "next/link";

const INQUIRY_TYPES = [
  "제품 도입 문의",
  "파트너십 / 투자",
  "기술 협력",
  "채용 문의",
  "기타",
];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  privacyAgreed: boolean;
}

const INITIAL_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  type: "",
  message: "",
  privacyAgreed: false,
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "성함을 입력해주세요.";
    if (!form.company.trim()) next.company = "소속/회사명을 입력해주세요.";
    if (!form.email.trim()) {
      next.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "올바른 이메일 주소를 입력해주세요.";
    }
    if (!form.type) next.type = "문의 유형을 선택해주세요.";
    if (!form.message.trim()) next.message = "문의 내용을 입력해주세요.";
    if (!form.privacyAgreed)
      (next as Record<string, string>).privacyAgreed =
        "개인정보 수집 및 이용에 동의해주세요.";
    setErrors(next as Partial<FormState>);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message);
        setForm(INITIAL_FORM);
      } else {
        setStatus("error");
        setServerMessage(data.error || "오류가 발생했습니다.");
      }
    } catch {
      setStatus("error");
      setServerMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  return (
    <div className="contact-page">
      {/* Page header */}
      <div className="contact-header">
        <div className="section-container">
          <Link href="/" className="breadcrumb-link">
            ← 홈으로
          </Link>
          <h1 className="contact-title">도입 문의</h1>
          <p className="contact-subtitle">
            EverEx 솔루션 도입에 관심이 있으신가요? 영업일 기준 1일 내에
            전담 매니저가 연락드립니다.
          </p>
        </div>
      </div>

      <div className="section-container contact-body">
        {/* Form column */}
        <div className="contact-form-wrap">
          {status === "success" ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h2 className="success-title">문의가 접수되었습니다!</h2>
              <p className="success-desc">{serverMessage}</p>
              <p className="success-desc">
                입력하신 이메일({form.email || "이메일"})로 확인 메일이
                발송됩니다.
              </p>
              <div className="success-actions">
                <Link href="/" className="btn-primary-lg">
                  홈으로 돌아가기
                </Link>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-ghost-inline"
                >
                  새 문의 작성
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="contact-form">
              <div className="form-row form-row-2">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    성함 <span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className={`form-input${errors.name ? " form-input-error" : ""}`}
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name}</p>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="company" className="form-label">
                    소속/회사명 <span className="required">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="(주) 에버엑스"
                    className={`form-input${errors.company ? " form-input-error" : ""}`}
                  />
                  {errors.company && (
                    <p className="form-error">{errors.company}</p>
                  )}
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    이메일 <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@company.com"
                    className={`form-input${errors.email ? " form-input-error" : ""}`}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email}</p>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="phone" className="form-label">
                    연락처
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="type" className="form-label">
                  문의 유형 <span className="required">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={`form-select${errors.type ? " form-input-error" : ""}`}
                >
                  <option value="">선택해주세요</option>
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="form-error">{errors.type}</p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  문의 내용 <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="문의하실 내용을 자유롭게 작성해주세요."
                  className={`form-textarea${errors.message ? " form-input-error" : ""}`}
                />
                {errors.message && (
                  <p className="form-error">{errors.message}</p>
                )}
              </div>

              <div className="form-field">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="privacyAgreed"
                    checked={form.privacyAgreed}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span>
                    <strong>개인정보 수집 및 이용에 동의합니다.</strong>{" "}
                    (필수) 수집 항목: 성명, 이메일, 연락처. 보유 기간: 문의
                    처리 완료 후 1년.
                  </span>
                </label>
                {(errors as Record<string, string>).privacyAgreed && (
                  <p className="form-error">
                    {(errors as Record<string, string>).privacyAgreed}
                  </p>
                )}
              </div>

              {status === "error" && (
                <div className="form-server-error">{serverMessage}</div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="form-submit"
              >
                {status === "loading" ? (
                  <>
                    <span className="loading-spinner" />
                    접수 중...
                  </>
                ) : (
                  "문의 접수하기"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Info sidebar */}
        <aside className="contact-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">연락처 안내</h3>
            <div className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="sidebar-item-label">전화</p>
                <p className="sidebar-item-value">02-000-0000</p>
              </div>
            </div>
            <div className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="sidebar-item-label">이메일</p>
                <p className="sidebar-item-value">contact@everex.co.kr</p>
              </div>
            </div>
            <div className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="sidebar-item-label">본사</p>
                <p className="sidebar-item-value">
                  서울 강남구 드림플러스 빌딩
                </p>
              </div>
            </div>
          </div>

          <div className="sidebar-card sidebar-card-blue">
            <h3 className="sidebar-title-white">이런 분들께 추천드려요</h3>
            <ul className="sidebar-list">
              <li>병원 / 재활 클리닉 도입 담당자</li>
              <li>기업 복지 / HR 담당자</li>
              <li>헬스케어 스타트업 / 기업</li>
              <li>투자사 / 파트너십 담당자</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3 className="sidebar-title">응답 안내</h3>
            <p className="sidebar-text">
              영업일 기준 <strong>1일 내</strong> 전담 매니저가 직접 연락
              드립니다. 주말 / 공휴일 접수분은 다음 영업일에 처리됩니다.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
