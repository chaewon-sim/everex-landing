import Link from "next/link";

const solutions = [
  {
    id: "mora-vu",
    tag: "AI 동작 분석",
    name: "MORA Vu",
    description:
      "AI 기반 근골격계 동작 분석 소프트웨어. 카메라만으로 관절 각도, 보행 패턴, 근력을 정밀 측정합니다.",
    badge: "FDA Class II",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: "mora-ex",
    tag: "재활 운동 플랫폼",
    name: "MORA Ex",
    description:
      "3,000여 개의 재활 운동 영상으로 개인 맞춤 운동 프로그램을 제공합니다. 집에서도 병원 수준의 재활을.",
    badge: "3,000+ 운동 영상",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "mora-care",
    tag: "기업 건강관리",
    name: "MORA Care",
    description:
      "임직원 근골격계 건강을 1:1 전문가 케어와 데이터 기반 리포트로 관리합니다. 산업 재해 예방부터 복직 지원까지.",
    badge: "기업 맞춤형",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "mora-cure",
    tag: "디지털 치료제",
    name: "MORA Cure",
    description:
      "재활과 인지행동치료를 결합한 근골격계 디지털 치료기기. 슬개대퇴통증증후군 임상시험 진행 중.",
    badge: "FDA 승인 진행중",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const awards = [
  {
    year: "2024",
    title: "CES Innovation Award",
    category: "Digital Health",
    icon: "🏆",
  },
  {
    year: "2024",
    title: "iF Design Award",
    category: "Product Design",
    icon: "🎖",
  },
  {
    year: "2023",
    title: "Red Dot Award",
    category: "Product Design",
    icon: "🔴",
  },
  {
    year: "2023",
    title: "K-Design Award",
    category: "우수상",
    icon: "🥇",
  },
  {
    year: "2023",
    title: "FDA Class II",
    category: "의료기기 등록",
    icon: "✅",
  },
  {
    year: "2024",
    title: "식약처 인증",
    category: "디지털 의료기기",
    icon: "🏥",
  },
];

const stats = [
  { value: "1,000억+", label: "누적 투자액" },
  { value: "15+", label: "의료기관 파트너" },
  { value: "3,000+", label: "재활 운동 영상" },
  { value: "5+", label: "글로벌 진출 국가" },
];

const strategicPartners = ["Samsung", "LG", "Novatis", "Premier", "Vineyard"];
const investorPartners = [
  "우리은행",
  "하나은행",
  "Spring Capital",
  "KB Investment",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-accent-circle hero-circle-1" aria-hidden="true" />
        <div className="hero-accent-circle hero-circle-2" aria-hidden="true" />

        <div className="section-container hero-inner">
          <div className="hero-content">
            <p className="hero-badge">AI 기반 근골격계 재활 플랫폼</p>
            <h1 className="hero-title">
              모두를 위한
              <br />
              <span className="hero-title-accent">맞춤형 재활</span>
            </h1>
            <p className="hero-desc">
              MORA 제품군으로 임상과 일상을 연결합니다.
              <br />
              AI 동작 분석부터 디지털 치료제까지, 근골격계 재활의 새로운 기준을
              만들어갑니다.
            </p>
            <div className="hero-cta-group">
              <Link href="/contact" className="btn-primary-lg">
                도입 문의하기
              </Link>
              <Link href="#solutions" className="btn-ghost-lg">
                솔루션 보기
                <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                  <path d="M8.5 2v11.3L13 9l.7.7-5.7 5.7L2.3 9.7 3 9l4.5 4.3V2h1z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card hero-card-main">
              <div className="hc-label">MORA Vu Analysis</div>
              <div className="hc-chart">
                <div className="hc-bar" style={{ height: "60%", animationDelay: "0s" }} />
                <div className="hc-bar" style={{ height: "85%", animationDelay: "0.1s" }} />
                <div className="hc-bar" style={{ height: "45%", animationDelay: "0.2s" }} />
                <div className="hc-bar" style={{ height: "72%", animationDelay: "0.3s" }} />
                <div className="hc-bar" style={{ height: "90%", animationDelay: "0.4s" }} />
                <div className="hc-bar" style={{ height: "55%", animationDelay: "0.5s" }} />
              </div>
              <div className="hc-meta">
                <span className="hc-tag hc-tag-green">정상 범위</span>
                <span className="hc-score">87점</span>
              </div>
            </div>
            <div className="hero-card hero-card-sm hero-card-top">
              <div className="hc-icon-sm">🏆</div>
              <div>
                <p className="hc-sm-title">CES 2024</p>
                <p className="hc-sm-sub">Innovation Award</p>
              </div>
            </div>
            <div className="hero-card hero-card-sm hero-card-btm">
              <div className="hc-icon-sm">✅</div>
              <div>
                <p className="hc-sm-title">FDA Class II</p>
                <p className="hc-sm-sub">의료기기 등록</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="section-container stats-bar-inner">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section id="solutions" className="section section-white">
        <div className="section-container">
          <p className="section-label">솔루션</p>
          <h2 className="section-title">
            MORA 제품군으로 완성하는
            <br />
            재활 생태계
          </h2>
          <p className="section-desc">
            평가부터 치료, 기업 복지까지 — 근골격계 재활의 전 단계를 아우르는
            통합 플랫폼
          </p>

          <div className="solutions-grid">
            {solutions.map((sol) => (
              <article key={sol.id} className="solution-card">
                <div className="sol-icon">{sol.icon}</div>
                <div className="sol-body">
                  <p className="sol-tag">{sol.tag}</p>
                  <h3 className="sol-name">{sol.name}</h3>
                  <p className="sol-desc">{sol.description}</p>
                </div>
                <div className="sol-footer">
                  <span className="sol-badge">{sol.badge}</span>
                  <Link href="/contact" className="sol-cta">
                    도입 문의
                    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                      <path d="M9.3 3.3L14 8l-4.7 4.7-.7-.7L12.3 8.5H2v-1h10.3L8.6 4l.7-.7z" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section id="awards" className="section section-gray">
        <div className="section-container">
          <p className="section-label">수상 / 인증</p>
          <h2 className="section-title">
            글로벌이 인정한
            <br />
            혁신 기술
          </h2>

          <div className="awards-grid">
            {awards.map((a) => (
              <div key={a.title} className="award-card">
                <span className="award-icon">{a.icon}</span>
                <p className="award-year">{a.year}</p>
                <p className="award-title">{a.title}</p>
                <p className="award-category">{a.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section id="partners" className="section section-white">
        <div className="section-container">
          <p className="section-label">파트너스</p>
          <h2 className="section-title">
            신뢰할 수 있는
            <br />
            글로벌 파트너
          </h2>

          <div className="partners-block">
            <div className="partners-group">
              <p className="partners-group-label">전략적 파트너</p>
              <div className="partners-row">
                {strategicPartners.map((p) => (
                  <div key={p} className="partner-logo-box">
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div className="partners-group">
              <p className="partners-group-label">투자사</p>
              <div className="partners-row">
                {investorPartners.map((p) => (
                  <div key={p} className="partner-logo-box">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hospital-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>국내 15개 이상 의료기관 파트너십</span>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="section section-dark">
        <div className="section-container cta-section">
          <div className="cta-content">
            <p className="cta-label">지금 시작하세요</p>
            <h2 className="cta-title">
              귀사에 맞는 재활 솔루션,
              <br />
              함께 찾아드립니다
            </h2>
            <p className="cta-desc">
              도입 문의부터 커스텀 데모까지, 전문 팀이 직접 안내해 드립니다.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="btn-primary-lg">
                도입 문의 바로가기
              </Link>
              <a href="mailto:contact@everex.co.kr" className="btn-outline-lg">
                이메일로 문의
              </a>
            </div>
          </div>
          <div className="cta-info-cards">
            <div className="cta-info-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="cta-info-title">영업일 기준 1일 내 회신</p>
                <p className="cta-info-sub">전담 매니저가 직접 연락드립니다</p>
              </div>
            </div>
            <div className="cta-info-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="cta-info-title">맞춤형 데모 제공</p>
                <p className="cta-info-sub">실제 제품으로 직접 경험해 보세요</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
