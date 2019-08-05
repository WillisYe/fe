/**
 * cookie操作方法，暂未用到
 */
let cookieUtil = {
    // 设置cookie
    set: function(name, value, expires, domain, path, secure) {
        let cookieText = "";
        // cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        cookieText += name + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    // name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
    // 获取cookie
    get: function(name) {
        // let cookieName = encodeURIComponent(name) + "=",
        let cookieName = name + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = "";
        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    // 删除cookie
    unset: function(name, domain, path, secure) {
        this.set(name, "", Date(0), domain, path, secure);
    }
};
// // 测试
// CookieUtil.set("name", "zhang");
// let name = CookieUtil.get("name");
// alert(name); // zhang
// CookieUtil.unset("name");
// alert(CookieUtil.get("name")); // 空
export default cookieUtil