# 登录认证

## 概述

登录走网易统一登录系统（`dl.reg.163.com`），采用 **RSA PKCS1** 非对称加密：
请求体统一为 `{ "encParams": "<RSA 密文>" }`，明文是登录参数 JSON 的 Base64（或直接 JSON）加密结果。

## 接口

### 1. 初始化 — 获取验证码能力

```
POST https://dl.reg.163.com/dl/zj/mail/ini
Content-Type: application/json
```

```json
{ "encParams": "<RSA加密的GetCapIdDTO>" }
```

明文结构（GetCapIdDTO）：

```json
{
  "pd": "f@163.com",
  "pkid": "43b6f3a0f2d94d4e8e3e5f9a1c2d3e4f",
  "pkht": "https://reg.163.com/",
  "channel": 3,
  "topURL": "https://mcdev.webapp.163.com/#/login/",
  "rtid": "<随机32位hex>"
}
```

### 2. 获取加密参数

```
POST https://dl.reg.163.com/dl/zj/mail/powGetP
```

```json
{ "encParams": "<RSA加密的GetPowerDTO>" }
```

明文结构（GetPowerDTO）：

```json
{
  "pkid": "43b6f3a0f2d94d4e8e3e5f9a1c2d3e4f",
  "pd": "f@163.com",
  "un": "user@163.com",
  "channel": 3,
  "topURL": "https://mcdev.webapp.163.com/#/login/",
  "rtid": "<随机32位hex>"
}
```

### 3. 获取票据

```
POST https://dl.reg.163.com/dl/zj/mail/gt
```

```json
{ "encParams": "<RSA加密的TicketDTO>" }
```

明文结构（TicketDTO）：

```json
{
  "un": "user@163.com",
  "pd": "f@163.com",
  "pkid": "43b6f3a0f2d94d4e8e3e5f9a1c2d3e4f",
  "channel": 3,
  "topURL": "https://mcdev.webapp.163.com/#/login/",
  "rtid": "<随机32位hex>"
}
```

### 4. 安全登录

```
POST https://dl.reg.163.com/dl/zj/mail/l
```

```json
{ "encParams": "<RSA加密的LoginDTO>" }
```

明文结构（LoginDTO）：

```json
{
  "un": "user@163.com",
  "pw": "<密码>",
  "pd": "f@163.com",
  "l": 0,
  "d": 10,
  "t": 1720000000000,
  "tk": "<上一步拿到的票据>",
  "pwdKeyUp": 1,
  "pkid": "43b6f3a0f2d94d4e8e3e5f9a1c2d3e4f",
  "domains": "",
  "pvParam": { "pv": "" },
  "channel": 3,
  "topURL": "https://mcdev.webapp.163.com/#/login/",
  "rtid": "<随机32位hex>"
}
```

## RSA 加密方式

- 算法：`RSA/ECB/PKCS1Padding`
- 公钥：Base64 解码 DER 格式公钥（网易下发的 `powGetP` 响应中获取）
- 输出：Base64 密文

```kotlin
// Kotlin 示例（dev.whyoleg.cryptography 库）
val publicKey = KeyDecoder.decodePublicKey(derBytes) { RSA }
val encrypted = publicKey.encrypt(plainBytes, RSA_PKCS1_V1_5)
val encParams = Base64.encodeToString(encrypted)
```

```java
// Java 示例（标准库）
Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
cipher.init(Cipher.ENCRYPT_MODE, publicKey);
byte[] encrypted = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
String encParams = Base64.getEncoder().encodeToString(encrypted);
```

## 常量约定

| 常量 | 值 | 说明 |
|---|---|---|
| `pkid` | `43b6f3a0f2d94d4e8e3e5f9a1c2d3e4f` | 产品 ID（写死） |
| `pd` | `f@163.com` | 产品域（写死） |
| `channel` | `3` | 渠道号 |
| `topURL` | `https://mcdev.webapp.163.com/#/login/` | 登录回跳地址 |
| `rtid` | 随机 32 位 hex | 每次请求重新生成 |