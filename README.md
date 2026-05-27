# 📰 Nwitter

해리포터의 **예언자일보(The Daily Prophet)** 를 테마로 한 SNS 웹 애플리케이션입니다.  
사용자는 'Journalist'로서 헤드라인·서브헤드·본문·이미지를 갖춘 기사 형식으로 글을 작성하고 공유할 수 있습니다.

🔗 **배포 링크**: [https://nwitter-reloaded-c85df.web.app](https://nwitter-reloaded-c85df.web.app)  
📁 **GitHub**: [https://github.com/leesaewa/nwitter](https://github.com/leesaewa/nwitter)

---

## 🛠 Tech Stack

| 분류 | 기술 |
|------|------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Styled Components |
| Routing | React Router DOM v6 |
| Backend / DB | Firebase (Auth, Firestore, Storage) |
| Deployment | Firebase Hosting |

---

## ✨ 주요 기능

- **이메일 / GitHub 소셜 로그인** (Firebase Authentication)
- **기사 작성** — Headline · Subhead · 본문(400~8,000자) · 이미지 첨부
- **기사 수정 / 삭제** — 본인 작성 글에 한해 수정·삭제 가능
- **타임라인** — 전체 기사 실시간 피드
- **프로필 페이지** — 아바타 · 커버 이미지 · 닉네임 수정
- **채널 페이지** — 다른 사용자의 프로필 및 작성 글 확인
- **반응형 레이아웃** — 모바일 / 태블릿 / 데스크탑 지원

---

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── common/          # 공통 컴포넌트 (Nav, Modal, Ad 등)
│   ├── layout.tsx       # 전체 레이아웃
│   ├── timeline.tsx     # 타임라인 피드
│   ├── tweet.tsx        # 기사(트윗) 카드
│   └── post-tweet-form.tsx  # 기사 작성 폼
├── routes/
│   ├── home.tsx         # 홈 (타임라인)
│   ├── profile.tsx      # 내 프로필
│   ├── Channel.tsx      # 다른 사용자 채널
│   ├── login.tsx        # 로그인
│   └── create-account.tsx   # 회원가입
├── style/               # Styled Components 스타일 파일
├── firebase.ts          # Firebase 설정
└── App.tsx              # 라우터 및 앱 진입점
```

---

## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 📦 배포

Firebase Hosting을 사용하며, 아래 명령어 하나로 빌드 + 배포가 완료됩니다.

```bash
npm run deploy
```

> PR 생성 시 GitHub Actions를 통해 Firebase Preview Channel에 자동 배포됩니다.
