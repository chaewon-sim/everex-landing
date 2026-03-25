import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EverEx | 모두를 위한 맞춤형 재활",
  description:
    "AI 기반 근골격계 재활 솔루션. MORA 제품군으로 임상과 일상을 연결합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="site-logo">
              <span className="logo-mark">E</span>
              <span className="logo-name">EverEx</span>
            </Link>

            <nav className="site-nav">
              <Link href="/#solutions" className="nav-link">
                솔루션
              </Link>
              <Link href="/#awards" className="nav-link">
                수상/인증
              </Link>
              <Link href="/#partners" className="nav-link">
                파트너스
              </Link>
              <Link href="/contact" className="nav-cta">
                도입 문의
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <Link href="/" className="site-logo">
                  <span className="logo-mark">E</span>
                  <span className="logo-name">EverEx</span>
                </Link>
                <p className="footer-tagline">
                  Bringing personalized rehabilitation to everyone.
                </p>
              </div>
              <div className="footer-cols">
                <div className="footer-col">
                  <p className="footer-col-title">솔루션</p>
                  <Link href="/#solutions" className="footer-link">
                    MORA Vu
                  </Link>
                  <Link href="/#solutions" className="footer-link">
                    MORA Ex
                  </Link>
                  <Link href="/#solutions" className="footer-link">
                    MORA Care
                  </Link>
                  <Link href="/#solutions" className="footer-link">
                    MORA Cure
                  </Link>
                </div>
                <div className="footer-col">
                  <p className="footer-col-title">회사</p>
                  <Link href="/#awards" className="footer-link">
                    수상/인증
                  </Link>
                  <Link href="/#partners" className="footer-link">
                    파트너스
                  </Link>
                  <Link href="/contact" className="footer-link">
                    문의하기
                  </Link>
                </div>
                <div className="footer-col">
                  <p className="footer-col-title">연락처</p>
                  <p className="footer-text">
                    서울 강남구 드림플러스 빌딩
                  </p>
                  <p className="footer-text">contact@everex.co.kr</p>
                  <p className="footer-text">02-000-0000</p>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 EverEx Inc. All rights reserved.</p>
              <div className="footer-legal">
                <Link href="#" className="footer-link-sm">
                  이용약관
                </Link>
                <Link href="#" className="footer-link-sm">
                  개인정보처리방침
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
