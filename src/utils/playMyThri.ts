// src/utils/playMyThri.ts
export async function playMyThri(text: string) {
    const apiKey = import.meta.env.VITE_ELEVEN_API_KEY;
    const voiceId = import.meta.env.VITE_ELEVEN_VOICE_ID;

    if (!apiKey || !voiceId) {
        console.error("❌ ElevenLabs API key or Voice ID is missing.");
        return;
    }

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "xi-api-key": apiKey
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.4,
                    similarity_boost: 0.85
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("🛑 Voice API Error:", errorText);
            return;
        }

        const audioBlob = await response.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.play();

    } catch (error) {
        console.error("⚠️ Error playing MyThri voice:", error);
    }
}
