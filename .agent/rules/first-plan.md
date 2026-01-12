---
trigger: always_on
---

CV Web Implementation & Style Guidelines
(public_html / GitHub Pages / Static Hosting)


* 웹을 test하기 위해서 브라우저로 접속할 때는 무조건 localhost:5500 으로 접속해서 확인한다.
* 만약 live server 가 켜져있지 않아 접속이 되지 않을 때는 사용자에게 알린 후 live server 켜기를 요청한다.
* 위 두개의 원칙은 절대 위배되어선 안되며, file 의 path 로 html 을 열 경우 js 가 로드되지 않아 사실과 다른 웹을 보게될 수 있다.

---

[1] Deployment & Hosting Constraints

* 본 웹사이트는 서버 사이드 기능이 없는 **정적 호스팅**을 전제로 한다.
* 최종 산출물은 HTML/CSS/JS 파일로 구성된 **정적 빌드 결과물**이어야 한다.
* `public_html` 또는 GitHub Pages에 **파일 복사만으로 배포 가능**해야 한다.
* SSR, API Routes, Server Actions 등 서버 런타임 의존 기능은 사용하지 않는다.
* 새로고침 시 404가 발생하지 않도록 SPA 라우팅은 사용하지 않거나, 정적 호스팅 친화적으로 설정한다.


---

[2] Toolchain / Stack

* Bundler / Dev Server

  * Vite 사용
  * 빌드 결과물은 `dist/` 디렉터리로 생성

* Frontend Framework

  * React 사용
  * 단일 페이지 스크롤 구조를 기본으로 한다.

* Language

  * TypeScript 사용 (strict 권장)

* UI Library

  * Mantine 사용 가능 및 권장
  * Next.js 전용 API는 사용하지 않는다.

* State / Data

  * 전역 상태 관리 라이브러리는 사용하지 않는다.
  * CV 데이터는 정적 데이터(파일 기반)로 로딩한다.

---

[3] Styling & Theme Guidelines

* 전체 테마

  * Dark theme 고정
  * 검은색 계열을 기본 배경으로 사용
  * 완전한 pure black(#000000)보다는 약간의 톤(#0f0f0f, #121212 등)을 사용

* Color Usage

  * 기본 텍스트는 고대비(연회색~백색)
  * 강조 색상(accent)은 1종만 사용 (파랑/보라/청록 계열 중 택1)
  * 불필요한 다색 사용 금지

* Typography

  * 가독성을 최우선
  * 섹션 헤더와 본문 텍스트의 계층이 명확해야 함
  * 라인 간격은 넉넉하게 설정

* Layout

  * 한 페이지 스크롤 구조
  * 섹션 간 충분한 vertical spacing
  * 카드형 UI는 필요한 곳에만 제한적으로 사용

* Animation

  * 필수 아님
  * 사용 시 subtle한 fade / slide 정도만 허용
  * 과한 motion, 패럴랙스 효과 금지

---

[4] Mantine Usage Rules

* Mantine ThemeProvider를 사용해

  * dark mode 고정
  * color scheme, font, spacing을 중앙에서 통제

* Mantine 컴포넌트 사용 원칙

  * Layout: Container / Stack / Group 위주
  * Typography: Text / Title 위주
  * 과도한 UI 컴포넌트(Button, Modal 등)는 CV 특성상 최소화

* Mantine에 없는 커스텀 스타일은

  * inline style 남용 금지
  * Mantine의 `styles` / `sx` / theme override 방식 우선

---

[5] Asset & Resource Rules

* 프로필 사진

  * 외부 URL 이미지를 직접 사용
  * 빌드 시 로컬로 복사하지 않아도 동작해야 함

* 이미지

  * 필요 최소한만 사용
  * 해상도 과도하게 크지 않게 조절

* 폰트

  * 웹 안전 폰트 또는 Google Fonts 사용
  * 폰트 수는 최대 1~2종

---

[6] GitHub Pages Compatibility

* 상대 경로 기준으로 동작해야 함
* Vite base path 설정 필수
* `/` 절대경로 하드코딩 금지
* 정적 파일 경로는 base를 고려해 작성

---

[7] Non-Goals (명시적 제외 사항)

* Next.js 사용 금지
* 서버 코드(Node backend, API 서버) 금지
* CMS, DB 연동 금지
* 로그인, 인증, 폼 제출 기능 금지
* SEO 메타 최적화는 기본 수준만 적용

---

[8] Overall Philosophy

* “논문 CV + 연구자 프로필”에 어울리는 절제된 디자인
* 화려함보다 **정돈됨, 신뢰감, 가독성**을 우선
* 장기 유지보수가 가능한 단순한 구조 유지
* public_html에 올려두고 **수년간 손 안 대도 되는** 안정성 중시