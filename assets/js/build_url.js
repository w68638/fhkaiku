function build_url() {
    var originalUrl = document.querySelector('#url').value;
    var expireDays = document.querySelector('#expire').value;
    var mode = document.querySelector('input[name="mode"]:checked').value;
    
    if (!originalUrl || originalUrl.indexOf("http") === -1) {
        document.getElementById("b_url").innerHTML = `输入的不是链接或者未加http请求头！`;
        return;
    }
    
    // 创建加密参数对象
    var params = {
        url: originalUrl,
        expire: expireDays,
        mode: mode,
        timestamp: new Date().getTime()
    };
    
    // 将参数对象转换为JSON并Base64编码
    var encodedParams = btoa(JSON.stringify(params));
    
    // 生成短链接
    var shortUrl = document.location.href + "api/?q=" + encodedParams;
    
    // 显示结果
    document.getElementById("b_url").innerHTML = `
        <p>生成的防红链接:</p>
        <input type="text" value="${shortUrl}" id="generatedUrl" readonly style="width: 100%; padding: 0.5em;">
        <button onclick="copyToClipboard()">复制链接</button>
    `;
}

function copyToClipboard() {
    var copyText = document.getElementById("generatedUrl");
    copyText.select();
    document.execCommand("copy");
    alert("链接已复制到剪贴板");
}
