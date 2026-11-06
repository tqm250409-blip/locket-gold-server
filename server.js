const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 1. FAKE API REVENUECAT (CHECK GOLD VIP)
app.get('/v1/subscribers/:app_user_id', (req, res) => {
    console.log(`[AXIOM] Có đứa vừa check VIP: ${req.params.app_user_id}`);
    res.json({
        "subscriber": {
            "entitlements": {
                "gold": {
                    "expires_date": "2100-01-01T00:00:00Z",
                    "purchase_date": "2024-01-01T00:00:00Z",
                    "product_identifier": "locket_gold_lifetime"
                }
            },
            "subscriptions": {
                "locket_gold_lifetime": {
                    "expires_date": "2100-01-01T00:00:00Z",
                    "period_type": "normal",
                    "store": "app_store"
                }
            }
        }
    });
});

// 2. FAKE API CONFIG (MỞ KHÓA 60S)
app.get('/v1/config', (req, res) => {
    res.json({
        "maxVideoDuration": 60,
        "isGold": true,
        "isPlus": true
    });
});

// 3. TỰ ĐỘNG PING GIỮ SERVER THỨC (RENDER FREE)
const url = `http://localhost:${port}/v1/config`;
setInterval(() => {
    require('http').get(url, (resp) => {
        console.log(`[AXIOM] Tự ping giữ server thức: ${resp.statusCode}`);
    }).on("error", (err) => {
        console.log("[AXIOM] Lỗi ping: " + err.message);
    });
}, 10 * 60 * 1000); // 10 phút ping 1 lần

app.listen(port, () => {
    console.log(`[AXIOM] Server riêng của đại ca đang chạy trên port ${port}`);
});