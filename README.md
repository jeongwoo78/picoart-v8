# 🎨 PicoArt v8 - Neural Style Transfer

Hugging Face 기반 진짜 Neural Style Transfer 웹 애플리케이션

## ✨ 주요 기능

- ✅ 진짜 Neural Style Transfer (Google Magenta 모델)
- ✅ 사진 구조 완벽 보존
- ✅ 빠른 처리 속도 (15-30초)
- ✅ Vercel 서버리스 배포
- ✅ 무료로 시작 가능

---

## 📋 필수 준비사항

### 1. Hugging Face 계정
1. https://huggingface.co/join 에서 회원가입
2. Settings → Access Tokens 이동
3. "New token" 클릭
4. Name: "PicoArt v8"
5. Type: "Read" 선택
6. Create token → 토큰 복사 (중요!)

### 2. Vercel 계정
1. https://vercel.com/signup 에서 회원가입
2. GitHub 계정 연동

### 3. GitHub Desktop (선택사항)
1. https://desktop.github.com/ 다운로드
2. 설치 및 GitHub 로그인

---

## 🚀 빠른 시작 (3단계)

### 1단계: 파일 다운로드
```bash
# 이 폴더의 모든 파일을 다운로드
picoart-v8/
├── index.html
├── huggingface-nst.js
├── api/
│   └── nst.js
├── vercel.json
├── package.json
└── .gitignore
```

### 2단계: GitHub에 업로드
**방법 A: GitHub Desktop 사용 (추천)**
1. GitHub Desktop 실행
2. File → New Repository
   - Name: `picoart-v8`
   - Local Path: 다운로드한 폴더 선택
3. "Create Repository" 클릭
4. "Publish repository" 클릭

**방법 B: 웹에서 직접**
1. https://github.com/new 접속
2. Repository name: `picoart-v8`
3. Create repository
4. Upload files 클릭
5. 모든 파일 드래그 앤 드롭

### 3단계: Vercel 배포
1. https://vercel.com/new 접속
2. "Import Git Repository"
3. `picoart-v8` 선택
4. "Deploy" 클릭
5. 완료! (1-2분 소요)

---

## 🔧 사용 방법

### 1. 배포된 사이트 접속
```
https://picoart-v8.vercel.app
(Vercel이 자동으로 생성한 URL)
```

### 2. Hugging Face 토큰 입력
- 첫 번째 입력란에 토큰 붙여넣기
- 자동 저장됨 (다음부터 입력 불필요)

### 3. 이미지 업로드
- 📷 사진 업로드: 변환할 사진
- 🖼️ 명화 선택: 스타일로 사용할 명화

### 4. 변환 실행
- "🎨 명화 스타일로 변환하기" 버튼 클릭
- 15-30초 대기
- 결과 이미지 다운로드!

---

## 💰 비용

### 무료 티어
- Hugging Face: 무료 크레딧
- Vercel: 무료 호스팅
- **총 비용: $0/월** ✅

### 확장 시
- Hugging Face PRO: $9/월 (20배 크레딧)
- 월 5,000+ 요청 시 권장

---

## 🔧 로컬 테스트 (선택사항)

### 설치
```bash
# Node.js 설치 필요 (https://nodejs.org)

# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```

### 접속
```
http://localhost:3000
```

---

## 🛠️ 커스터마이징

### 디자인 변경
`index.html` 파일의 `<style>` 섹션 수정

### 로고 추가
```html
<!-- index.html 상단 -->
<div class="header">
    <img src="logo.png" alt="Logo" style="width: 100px;">
    <h1>🎨 PicoArt</h1>
</div>
```

### 도메인 연결
Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Domains
3. 도메인 추가

---

## 📊 Hugging Face Space 대안

### 현재 사용: Gradio API
- Space: `keras-io/neural-style-transfer`
- 장점: 공식 Keras 모델, 안정적
- 속도: 15-30초

### 대체 Spaces (자동 폴백)
1. `Sa-m/Neural-Style-Transfer-Image-Stylization`
2. `luca-martial/neural-style-transfer`
3. `georgescutelnicu/neural-style-transfer`

### Space가 느릴 때
`api/nst.js` 파일에서 spaceUrl 변경:
```javascript
const spaceUrl = 'https://다른-space-id.hf.space';
```

---

## 🐛 문제 해결

### "API 호출 실패" 에러
**원인:** Hugging Face 토큰 문제
**해결:**
1. 토큰 재확인
2. Read 권한 확인
3. 새 토큰 생성

### "처리 시간 초과" 에러
**원인:** Space cold start
**해결:**
1. 다시 시도 (첫 요청은 느림)
2. 다른 Space 시도

### "이미지가 너무 큼" 에러
**원인:** 파일 크기 제한
**해결:**
1. 이미지 크기 1024px 이하로 조절
2. JPG 형식 사용 (압축률 높음)

---

## 📈 성능 최적화

### 이미지 크기
```javascript
// huggingface-nst.js에서 수정
async function resizeImage(base64, maxSize = 1024) {
    // maxSize를 512로 줄이면 더 빠름
}
```

### 타임아웃 증가
```javascript
// api/nst.js에서 수정
const response = await fetch(spaceUrl, {
    // ...
    timeout: 60000  // 60초로 증가
});
```

---

## 🔄 업데이트 방법

### GitHub Desktop
1. 파일 수정
2. Summary에 "v8.1 업데이트" 입력
3. "Commit to main" 클릭
4. "Push origin" 클릭

### Vercel 자동 배포
- GitHub에 push하면 자동 재배포
- 1-2분 후 반영

---

## 📞 지원

### Hugging Face 문제
- Docs: https://huggingface.co/docs
- Forum: https://discuss.huggingface.co

### Vercel 문제
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

---

## 📝 라이선스

MIT License

---

## 🎯 다음 단계

### Phase 1 (현재)
- ✅ Hugging Face 배포
- ✅ 무료로 시작

### Phase 2 (3개월 후)
- 사용자 확보
- PRO 계정 업그레이드 ($9/월)

### Phase 3 (6개월 후)
- 자체 Python 백엔드 구축
- 특허 기술 완전 구현
- 비용 고정 ($50/월)

---

## ⚡ 빠른 배포 체크리스트

- [ ] Hugging Face 토큰 발급
- [ ] GitHub 저장소 생성
- [ ] 파일 업로드
- [ ] Vercel 연결
- [ ] 배포 완료
- [ ] 토큰 입력 테스트
- [ ] 이미지 변환 테스트
- [ ] 완료! 🎉

---

**문의: jwcho78@naver.com**


