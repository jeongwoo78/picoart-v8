/**
 * PicoArt v8 - Neural Style Transfer API
 * Vercel Serverless Function
 */

export default async function handler(req, res) {
    // CORS 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { token, photoBase64, styleBase64 } = req.body;
        
        if (!token || !photoBase64 || !styleBase64) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: '토큰, 사진, 스타일 이미지가 모두 필요합니다.'
            });
        }
        
        console.log('🎨 Processing NST request...');
        
        // Hugging Face Inference API 호출
        const result = await callHuggingFaceNST(token, photoBase64, styleBase64);
        
        return res.status(200).json({
            success: true,
            imageUrl: result.imageUrl
        });
        
    } catch (error) {
        console.error('❌ NST Error:', error);
        return res.status(500).json({ 
            error: 'Processing failed',
            message: error.message
        });
    }
}

async function callHuggingFaceNST(token, photoBase64, styleBase64) {
    // 방법 1: Hugging Face Space API 사용 (Gradio)
    // 가장 안정적이고 빠른 방법
    
    const spaceUrl = 'https://keras-io-neural-style-transfer.hf.space';
    
    try {
        // Gradio API 호출
        const response = await fetch(`${spaceUrl}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: [
                    `data:image/jpeg;base64,${photoBase64}`,  // Content image
                    `data:image/jpeg;base64,${styleBase64}`   // Style image
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Gradio 응답 파싱
        // 응답 형식: { data: ["data:image/jpeg;base64,..."] }
        if (result.data && result.data[0]) {
            return {
                imageUrl: result.data[0]
            };
        }
        
        throw new Error('Invalid response from Hugging Face');
        
    } catch (error) {
        console.error('Gradio API failed, trying alternative method:', error);
        
        // 방법 2: 다른 Space 시도
        return await tryAlternativeSpace(token, photoBase64, styleBase64);
    }
}

async function tryAlternativeSpace(token, photoBase64, styleBase64) {
    // 대안 Space들
    const alternativeSpaces = [
        'Sa-m-Neural-Style-Transfer-Image-Stylization',
        'luca-martial-neural-style-transfer',
        'georgescutelnicu-neural-style-transfer'
    ];
    
    for (const spaceId of alternativeSpaces) {
        try {
            const spaceUrl = `https://${spaceId}.hf.space`;
            
            const response = await fetch(`${spaceUrl}/api/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [
                        `data:image/jpeg;base64,${photoBase64}`,
                        `data:image/jpeg;base64,${styleBase64}`
                    ]
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.data && result.data[0]) {
                    console.log(`✅ Success with ${spaceId}`);
                    return {
                        imageUrl: result.data[0]
                    };
                }
            }
        } catch (error) {
            console.log(`Failed with ${spaceId}:`, error.message);
            continue;
        }
    }
    
    // 모든 Space 실패 시 직접 Inference API 시도
    return await useInferenceAPI(token, photoBase64, styleBase64);
}

async function useInferenceAPI(token, photoBase64, styleBase64) {
    // Hugging Face Inference API 직접 호출
    // 이 방법은 모델이 Inference API에서 지원될 때만 작동
    
    const apiUrl = 'https://api-inference.huggingface.co/models/YOUR_MODEL_ID';
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputs: {
                content: photoBase64,
                style: styleBase64
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`Inference API failed: ${response.status}`);
    }
    
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    return {
        imageUrl: `data:image/jpeg;base64,${base64}`
    };
}
