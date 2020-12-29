# CORS 跨域 Cookie 写入

## 场景

* 主页面在 foo.com:3000 域下
* 主页面 Ajax 请求 bar.com:3000 的 /set-cookie 请求，后者会在 bar.com 下写入一个 cookie
* 主页面 Ajax 请求 bar.com:3000 的 /echo-cookie 请求，后者会将 cookie header 中的值直接返回，让前端 js 可以读到

## 如何使用这个 Demo

编辑 `/etc/hosts` 增加:

```
127.0.0.1 foo.com
127.0.0.1 bar.com
```

浏览器中先访问 `https://bar.com:3000/echo-cookie`，忽略证书警告。

然后在浏览器中访问 `https://foo.com:3000/public`，可以看到 `set cookie to bar.com` 与 `echo cookie from bar.com` 是一致的。

## 测试结果

以下浏览器通过测试:
* Chrome 87.0.4280.88
* Safari 14.0.1

## 跨域 Cookie 写入的限制条件

0. 连接必须是 https 协议
1. 客户端请求 `XMLHTTPRequest` 必须设置 `withCredentials` 为 true
2. 服务器要返回 `Access-Control-Allow-Credentials` 与 `Access-Control-Allow-Origin`，并且 `Access-Control-Allow-Origin` 不能为 `*`
3. 服务器返回的 Cookie 应该是 `Secure; SameSite=None`。另外 Cookie 中的 Domain 不需要包括端口号

## 为什么要这样做

* Cookie 如果不指定 SameSite，则默认为 Lax，此时 Cookie 只会于顶级导航请求（页面主域名下）发送，或者是第三方网站的 GET 请求发送
* 以前 SameSite 的默认值为 None，最近的浏览器把这个行为改成了 Lax
* 使用 None 时，需在最新的浏览器版本中使用 Secure 属性，详见 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite#针对常见警告信息的解决办法

## Reference

* [SameSite cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite): 从协议层面给了详细的解释
* [Stackoverflow: Set cookies for cross origin requests (Answer 1)](https://stackoverflow.com/a/46412839): 提出了客户端和服务器的限制
* [Stackoverflow: Set cookies for cross origin requests (Answer 2)](https://stackoverflow.com/a/62726825): 提出了 Secure 和 SameSite 的限制
