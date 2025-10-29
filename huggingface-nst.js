/**
 * PicoArt v8 - Hugging Face Neural Style Transfer
 * 프론트엔드 API 호출 로직 (자동 이미지 축소 기능 추가)
 */

async function applyNeuralStyleTransfer(token, photoFile, styleFile) {
    console.log('🎨 Starting Neural Style Transfer...');
    
    // 이미지를 base64로 변환 및 자동 리사이징
    console.log('📸 Processing photo...');
    const photoBase64 = await fileToBase64AndResize(photoFile, '사진');
    
    console.log('🖼️ Processing style image...');
    const styleBase64 = await fileToBase64AndResize(styleFile, '명화');
    
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

/**
 * 파일을 Base64로 변환하고 필요시 자동으로 리사이징
 */
async function fileToBase64AndResize(file, imageType = '이미지') {
    return new Promise((resolve, reject) => {
        // 파일 크기 확인 (5MB 이상이면 경고)
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
            showNotification(`⚠️ ${imageType}이 큽니다 (${fileSizeMB.toFixed(1)}MB). 자동으로 축소합니다...`, 'warning');
        }
        
        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result.split(',')[1];
            
            // 이미지 크기 확인 및 리사이징
            const resizedBase64 = await resizeImageIfNeeded(reader.result, imageType);
            
            resolve(resizedBase64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * 이미지가 너무 크면 자동으로 리사이징
 */
async function resizeImageIfNeeded(dataUrl, imageType = '이미지') {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const originalWidth = img.width;
            const originalHeight = img.height;
            const maxSize = 1024; // 최대 크기
            
            let width = originalWidth;
            let height = originalHeight;
            let needsResize = false;
            
            // 크기 확인
            if (width > maxSize || height > maxSize) {
                needsResize = true;
                if (width > height) {
                    height = (height / width) * maxSize;
                    width = maxSize;
                } else {
                    width = (width / height) * maxSize;
                    height = maxSize;
                }
            }
            
            // 리사이징이 필요한 경우
            if (needsResize) {
                console.log(`📐 ${imageType} 리사이징: ${originalWidth}x${originalHeight} → ${Math.round(width)}x${Math.round(height)}`);
                showNotification(`✅ ${imageType} 크기 조정: ${Math.round(width)}x${Math.round(height)}px`, 'success');
                
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // 80% 품질로 압축하여 용량 절감
                const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                
                // 압축 후 크기 계산
                const compressedSizeMB = (resizedBase64.length * 0.75) / (1024 * 1024);
                console.log(`💾 압축 후 크기: ${compressedSizeMB.toFixed(2)}MB`);
                
                resolve(resizedBase64);
            } else {
                // 리사이징 불필요
                console.log(`✅ ${imageType} 크기 적절: ${width}x${height}px`);
                resolve(dataUrl.split(',')[1]);
            }
        };
        img.src = dataUrl;
    });
}

/**
 * 사용자에게 알림 표시
 */
function showNotification(message, type = 'info') {
    // 기존 알림이 있으면 제거
    const existing = document.getElementById('image-notification');
    if (existing) {
        existing.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.id = 'image-notification';
    notification.textContent = message;
    
    // 스타일 적용
    const colors = {
        info: '#2196f3',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 애니메이션 스타일 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
