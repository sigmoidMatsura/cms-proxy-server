/**
 * microCMS用 プロキシ中継サーバー
 * iOSアプリからのリクエストを安全にmicroCMSへ転送します
 */
export default async function handler(req, res) {
    // 1. 環境変数のチェック
    const apiKey = process.env.MICROCMS_API_KEY;
    const serviceId = process.env.MICROCMS_SERVICE_ID;

    if (!apiKey || !serviceId) {
        return res.status(500).json({ error: 'Internal Server Configuration Error' });
    }

    // 2. クエリパラメータからIDを取得
    const { id } = req.query;
    const baseUrl = `https://${serviceId}.microcms.io/api/v1/home`;
    const targetUrl = id ? `${baseUrl}/${id}` : baseUrl;

    try {
        // 3. リクエストの構築
        const options = {
            method: req.method,
            headers: {
                'X-MICROCMS-API-KEY': apiKey,
                'Content-Type': 'application/json',
            },
        };

        // GET以外のメソッド(POST, PATCH, DELETE等)の場合、bodyを転送する
        if (req.method !== 'GET' && req.body) {
            options.body = JSON.stringify(req.body);
        }

        // 4. microCMSへ転送
        const response = await fetch(targetUrl, options);

        // microCMSからのレスポンスをそのままクライアントへ返す
        const data = await response.json();
        return res.status(response.status).json(data);

    } catch (error) {
        // 5. 異常系処理 (通信エラーなど)
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Failed to process request' });
    }
}