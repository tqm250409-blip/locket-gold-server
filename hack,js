let url = $request.url;
let body = $response.body;
if (url.includes("revenuecat") || url.includes("locketcamera")) {
    try {
        let obj = JSON.parse(body);
        if (obj.result) {
            obj.result.isGold = true;
            obj.result.isPlus = true;
            obj.result.subscription = "gold_premium";
            if (obj.result.user) {
                obj.result.user.isGold = true;
                obj.result.user.isPlus = true;
            }
            if (obj.result.maxVideoDuration !== undefined) {
                obj.result.maxVideoDuration = 30; // Ép xuống 30s theo yêu cầu
            }
        }
        if (obj.maxVideoDuration !== undefined) {
            obj.maxVideoDuration = 30;
        }
        // Tự động fake AI Icon
        if (url.includes("generate_icon") || url.includes("ai")) {
            obj.status = "success";
            obj.result = {
                "icon_url": "https://api.dicebear.com/7.x/bottts/png?seed=GoldVIP",
                "is_premium": true
            };
        }
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}
