async function Update() {
    await fetch('https://www.usom.gov.tr/url-list.txt').then(function (response) {
        // Insert USOM data
        document.getElementById("change").innerText = "Updating...";
        console.log("URLSOM Updating...\nPlease wait... Browser may freeze during loading please don't worry!");
        try {
            response.text().then(function (text) {
                const result = text.split("\n");
                for (var i = 0; i < result.length; i++) {
                    const sonuc = 1001 + i;
                    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [sonuc], addRules: [{ "id": sonuc, "priority": 1, "action": { "type": "block" }, "condition": { "urlFilter": "" + result[i] + "", "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "script", "image", "xmlhttprequest", "font", "object", "ping", "websocket", "csp_report", "media", "other"] } }] });
                }
                document.getElementById("change").innerText = "Updated!";
                console.log("Updated!");
            });
        } catch (error) {
            document.getElementById("change").innerText = "URLSOM Extension Error : " + error;
            console.log("URLSOM Extension Error : " + error);
        }

    });
}

Update();
