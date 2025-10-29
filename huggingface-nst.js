/**
 * PicoArt v8 - Hugging Face Neural Style Transfer
 * 프론트엔드 API 호출 로직
 */

async function applyNeuralStyleTransfer(token, photoFile, styleFile) {
    console.log('🎨 Starting Neural Style Transfer...');
    
    // 이미지를 base64로 변환
    const photoBase64 = await fileToBase64(photoFile);
    const styleBase64 = await fileToBase64(styleFile);
    
    // Vercel 서버리스 함수 호출
    const response = await fetch('/api/nst', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            photoBase64: photoBase64,
            styleBase64: styleBase64
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API 호출 실패');
    }
    
    const result = await response.json();
    
    return {
        imageUrl: result.imageUrl
    };
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // data:image/jpeg;base64,... 형식에서 base64 부분만 추출
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 이미지 리사이징 (용량 절감)
async function resizeImage(base64, maxSize = 1024) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // 최대 크기 제한
            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height = (height / width) * maxSize;
                    width = maxSize;
                } else {
                    width = (width / height) * maxSize;
                    height = maxSize;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // 80% 품질로 압축
            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
            resolve(resizedBase64);
        };
        img.src = 'data:image/jpeg;base64,' + base64;
    });
}
