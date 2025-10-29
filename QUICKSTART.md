# ⚡ PicoArt v8 - 5분 빠른 시작

**목표:** 5분 안에 배포하고 테스트하기

---

## 🎯 체크리스트 (모두 체크하세요!)

```
준비물:
□ Hugging Face 계정
□ Hugging Face API 토큰
□ Vercel 계정
□ GitHub 계정
□ 다운로드한 picoart-v8 폴더

배포:
□ GitHub 저장소 생성
□ 파일 업로드
□ Vercel 연결
□ 배포 완료

테스트:
□ 사이트 접속
□ 토큰 입력
□ 이미지 변환 테스트
□ 완료!
```

---

## ⏱️ 1단계: Hugging Face 토큰 (1분)

### 이미 계정이 있다면:
1. https://huggingface.co/settings/tokens
2. "New token" 클릭
3. Name: `picoart-v8`
4. Type: `Read` 선택
5. Create token
6. **토큰 복사** (중요! 다시 볼 수 없음)

### 계정이 없다면:
1. https://huggingface.co/join
2. 이메일로 가입
3. 이메일 인증
4. 위의 "이미 계정이 있다면" 단계 진행

---

## ⏱️ 2단계: GitHub 저장소 (2분)

### 방법 A: 웹에서 (추천)

1. **GitHub 접속**
   - https://github.com/new

2. **저장소 생성**
   ```
   Repository name: picoart-v8
   Description: Neural Style Transfer with Hugging Face
   Public 선택
   Create repository 클릭
   ```

3. **파일 업로드**
   - "uploading an existing file" 클릭
   - 다운로드한 폴더의 모든 파일 드래그
   - Commit changes 클릭

### 업로드할 파일:
```
✅ index.html
✅ huggingface-nst.js
✅ api/nst.js
✅ vercel.json
✅ package.json
✅ .gitignore
```

---

## ⏱️ 3단계: Vercel 배포 (2분)

1. **Vercel 접속**
   - https://vercel.com/new

2. **GitHub 연동**
   - "Continue with GitHub" 클릭
   - 권한 허용

3. **저장소 선택**
   - `picoart-v8` 찾기
   - "Import" 클릭

4. **배포 설정**
   ```
   Project Name: picoart-v8
   Framework Preset: Other
   Root Directory: ./
   
   "Deploy" 클릭
   ```

5. **완료 대기**
   - 1-2분 소요
   - 성공 시 URL 자동 생성
   - 예: https://picoart-v8-xxx.vercel.app

---

## ✅ 4단계: 테스트 (30초)

1. **배포 URL 접속**
   - Vercel에서 제공한 URL 클릭

2. **토큰 입력**
   - 첫 번째 입력란에 Hugging Face 토큰 붙여넣기
   - 자동 저장됨

3. **테스트 이미지**
   ```
   사진: 아무 인물 사진
   스타일: 반 고흐의 별이 빛나는 밤
   
   "변환하기" 버튼 클릭
   15-30초 대기
   ```

4. **성공!** 🎉
   - 결과 이미지 확인
   - 다운로드 버튼 클릭

---

## 🚨 문제 발생 시

### "API 호출 실패"
```
원인: 토큰 문제
해결:
1. 토큰 다시 복사
2. Read 권한 확인
3. 새 토큰 생성
```

### "배포 실패"
```
원인: 파일 누락
해결:
1. 모든 파일 확인
2. api 폴더 포함 확인
3. 다시 배포
```

### "이미지 처리 안 됨"
```
원인: Space cold start
해결:
1. 30초 더 대기
2. 다시 시도
```

---

## 📱 다음 단계

### 커스터마이징
- `index.html`에서 디자인 변경
- 로고 추가
- 색상 변경

### 도메인 연결
- Vercel → Settings → Domains
- 원하는 도메인 추가

### 분석 추가
- Google Analytics
- Vercel Analytics

---

## 💰 비용 확인

```
현재 비용: $0/월

무료로 포함:
✅ Vercel 호스팅
✅ Hugging Face 무료 크레딧
✅ SSL 인증서
✅ 자동 배포

나중에 필요:
- Hugging Face PRO: $9/월 (확장 시)
```

---

## 🎉 완료!

```
✅ 5분 안에 배포 완료
✅ 실제 작동하는 서비스
✅ 무료로 시작
✅ 언제든 확장 가능
```

**URL을 친구들과 공유하세요!** 🚀

---

## 📞 도움이 필요하면

- 이메일: jwcho78@naver.com
- README.md 파일 참고
- TROUBLESHOOTING.md 파일 참고
