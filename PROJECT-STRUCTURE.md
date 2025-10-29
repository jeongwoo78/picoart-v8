# 📂 PicoArt v8 - 프로젝트 구조

**전체 파일 구조와 각 파일의 역할 설명**

---

## 📁 전체 구조

```
picoart-v8/
├── 📄 index.html              (메인 웹페이지)
├── 📄 huggingface-nst.js      (프론트엔드 로직)
├── 📁 api/
│   └── 📄 nst.js              (백엔드 API)
├── 📄 vercel.json             (배포 설정)
├── 📄 package.json            (프로젝트 정보)
├── 📄 .gitignore              (Git 제외 파일)
├── 📄 README.md               (전체 가이드)
├── 📄 QUICKSTART.md           (5분 시작 가이드)
├── 📄 TROUBLESHOOTING.md      (문제 해결)
├── 📄 CASE-STUDY.md           (유사 사례 분석)
└── 📄 PROJECT-STRUCTURE.md    (이 파일)
```

---

## 📄 핵심 파일 설명

### 1. index.html (프론트엔드)

**역할:** 사용자가 보는 웹페이지

**주요 기능:**
```html
1. UI 디자인 (HTML + CSS)
   - 헤더
   - 토큰 입력
   - 이미지 업로드
   - 변환 버튼
   - 결과 표시

2. 이벤트 처리 (JavaScript)
   - 파일 선택 시 미리보기
   - 토큰 저장 (localStorage)
   - 변환 버튼 클릭
   - 진행 상태 표시
   - 결과 다운로드
```

**수정 가능한 부분:**
```css
/* 색상 변경 */
.header h1 {
    color: #667eea;  /* 원하는 색상으로 */
}

/* 로고 추가 */
<div class="header">
    <img src="logo.png" alt="Logo">
    <h1>PicoArt</h1>
</div>
```

**크기:** ~15KB
**언어:** HTML, CSS, JavaScript

---

### 2. huggingface-nst.js (API 통신)

**역할:** 프론트엔드 ↔ 백엔드 통신

**주요 기능:**
```javascript
1. applyNeuralStyleTransfer()
   - 메인 함수
   - Vercel API 호출
   - 에러 처리

2. fileToBase64()
   - 이미지를 Base64로 변환
   - API 전송용

3. resizeImage()
   - 이미지 리사이징
   - 용량 절감
```

**데이터 흐름:**
```
사용자 이미지
  ↓
fileToBase64()
  ↓
JSON 변환
  ↓
/api/nst 호출
  ↓
결과 반환
```

**크기:** ~3KB
**언어:** JavaScript (ES6)

---

### 3. api/nst.js (백엔드 로직)

**역할:** Hugging Face API 호출 및 처리

**주요 기능:**
```javascript
1. handler()
   - Vercel 서버리스 함수
   - 요청 검증
   - CORS 설정

2. callHuggingFaceNST()
   - Hugging Face Space 호출
   - Gradio API 사용

3. tryAlternativeSpace()
   - 폴백 로직
   - 여러 Space 시도

4. useInferenceAPI()
   - 직접 Inference API
   - 최후의 수단
```

**처리 흐름:**
```
1. 토큰 & 이미지 받기
2. keras-io Space 시도
3. 실패 시 → luca-martial 시도
4. 실패 시 → georgescutelnicu 시도
5. 모두 실패 시 → Inference API
6. 결과 반환
```

**크기:** ~8KB
**언어:** JavaScript (Node.js)

---

### 4. vercel.json (배포 설정)

**역할:** Vercel 배포 구성

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",     // API 함수
      "use": "@vercel/node"     // Node.js 런타임
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",       // API 경로
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",           // 정적 파일
      "dest": "/$1"
    }
  ]
}
```

**중요:**
- 수정 필요 없음
- 이미 최적화됨
- 삭제하면 배포 안 됨

**크기:** <1KB
**언어:** JSON

---

### 5. package.json (프로젝트 정보)

**역할:** npm 패키지 정보

```json
{
  "name": "picoart-v8",
  "version": "8.0.0",
  "description": "Neural Style Transfer",
  "scripts": {
    "dev": "vercel dev",      // 로컬 개발
    "deploy": "vercel --prod"  // 프로덕션 배포
  }
}
```

**사용:**
- npm run dev → 로컬 테스트
- npm run deploy → 배포

**크기:** <1KB
**언어:** JSON

---

### 6. .gitignore (Git 제외)

**역할:** Git에서 무시할 파일

```bash
node_modules/    # 의존성
.vercel/         # Vercel 캐시
.env             # 환경 변수
.DS_Store        # Mac 파일
```

**중요:**
- 민감한 정보 보호
- 불필요한 파일 제외

**크기:** <1KB
**언어:** Text

---

## 📚 문서 파일 설명

### README.md
- 전체 가이드
- 상세 설명
- 모든 정보 포함

### QUICKSTART.md
- 5분 빠른 시작
- 단계별 체크리스트
- 초보자용

### TROUBLESHOOTING.md
- 문제 해결
- 자주 묻는 질문
- 디버깅 방법

### CASE-STUDY.md
- 유사 사례 분석
- 실제 사용 사례
- 성공 패턴

### PROJECT-STRUCTURE.md
- 이 파일
- 구조 설명
- 파일 역할

---

## 🔄 데이터 흐름

### 전체 처리 과정

```
┌─────────────┐
│   사용자     │
└──────┬──────┘
       │ 1. 이미지 업로드
       ↓
┌─────────────┐
│ index.html  │
└──────┬──────┘
       │ 2. Base64 변환
       ↓
┌──────────────────┐
│ huggingface-     │
│ nst.js           │
└──────┬───────────┘
       │ 3. POST /api/nst
       ↓
┌──────────────────┐
│ api/nst.js       │
│ (Vercel)         │
└──────┬───────────┘
       │ 4. Gradio API 호출
       ↓
┌──────────────────┐
│ Hugging Face     │
│ Space            │
└──────┬───────────┘
       │ 5. NST 처리
       ↓
┌──────────────────┐
│ 결과 이미지      │
└──────┬───────────┘
       │ 6. Base64 반환
       ↓
┌──────────────────┐
│ 사용자에게       │
│ 표시             │
└──────────────────┘
```

---

## 🛠️ 커스터마이징 가이드

### 디자인 변경

**색상 변경:**
```css
/* index.html 내부 */
:root {
    --primary: #667eea;      /* 메인 색상 */
    --secondary: #764ba2;    /* 보조 색상 */
    --text: #333;            /* 텍스트 */
}
```

**로고 추가:**
```html
<!-- index.html 헤더 -->
<div class="header">
    <img src="logo.png" alt="PicoArt" 
         style="width: 100px; margin-bottom: 20px;">
    <h1>🎨 PicoArt</h1>
</div>
```

---

### 기능 확장

**1. 스타일 강도 조절 추가**
```html
<!-- index.html에 추가 -->
<input type="range" id="styleStrength" 
       min="0" max="100" value="50">
<label>스타일 강도: <span id="strength">50</span>%</label>

<script>
document.getElementById('styleStrength').addEventListener('input', (e) => {
    document.getElementById('strength').textContent = e.target.value;
});
</script>
```

**2. 이미지 크기 자동 조절**
```javascript
// huggingface-nst.js에 추가
async function autoResize(file) {
    if (file.size > 2 * 1024 * 1024) {  // 2MB 이상
        const base64 = await fileToBase64(file);
        return await resizeImage(base64, 1024);
    }
    return await fileToBase64(file);
}
```

**3. 히스토리 저장**
```javascript
// localStorage에 결과 저장
function saveHistory(imageUrl) {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push({
        url: imageUrl,
        date: new Date().toISOString()
    });
    localStorage.setItem('history', JSON.stringify(history));
}
```

---

### Space 변경

**기본 Space 교체:**
```javascript
// api/nst.js에서
const spaceUrl = 'https://YOUR-SPACE.hf.space';
```

**폴백 순서 변경:**
```javascript
const alternativeSpaces = [
    'space-1',
    'space-2',
    'space-3'
];
```

---

## 📊 성능 최적화

### 프론트엔드
```javascript
// 이미지 압축
const quality = 0.8;  // 80% 품질

// 캐싱
localStorage.setItem('cachedResult', imageUrl);

// 프리로딩
window.addEventListener('load', warmupSpace);
```

### 백엔드
```javascript
// 타임아웃 증가
const timeout = 60000;  // 60초

// 재시도 로직
const maxRetries = 3;

// 병렬 처리
Promise.race([space1(), space2()]);
```

---

## 🔐 보안 고려사항

### 토큰 보안
```javascript
// localStorage 사용 (브라우저만)
✅ 서버로 전송 안 됨
✅ HTTPS 필수
⚠️ XSS 주의
```

### API 보안
```javascript
// CORS 설정
res.setHeader('Access-Control-Allow-Origin', '*');

// Rate Limiting (TODO)
// 향후 구현 필요
```

---

## 📈 모니터링

### Vercel Analytics
```
1. Vercel 대시보드
2. Analytics 탭
3. 트래픽 확인
```

### Error Tracking
```javascript
// Console 에러 확인
console.error('NST Error:', error);

// Sentry 추가 (선택)
// npm install @sentry/browser
```

---

## 🚀 배포 전략

### 개발 환경
```bash
npm run dev
→ http://localhost:3000
```

### 프로덕션 배포
```bash
git push origin main
→ Vercel 자동 배포
→ 1-2분 소요
```

### 롤백
```
Vercel 대시보드
→ Deployments
→ 이전 버전 선택
→ "Promote to Production"
```

---

## 💾 백업 전략

### 정기 백업
```
1. GitHub에 자동 저장
2. 로컬에도 사본 보관
3. Vercel 자동 백업
```

### 재해 복구
```
1. GitHub 저장소 클론
2. Vercel 재연결
3. 재배포
```

---

## 📞 지원 및 문의

### 코드 관련
- GitHub Issues
- 이메일: jwcho78@naver.com

### Hugging Face
- https://discuss.huggingface.co

### Vercel
- https://vercel.com/support

---

## 🎯 다음 단계

### Phase 1 (현재)
- ✅ 기본 배포
- ✅ 무료 운영

### Phase 2
- [ ] 커스텀 도메인
- [ ] Analytics 추가
- [ ] UI 개선

### Phase 3
- [ ] 프리미엄 기능
- [ ] 자체 백엔드
- [ ] 모바일 앱

---

**이 문서가 프로젝트 이해에 도움이 되길 바랍니다!** 📚
