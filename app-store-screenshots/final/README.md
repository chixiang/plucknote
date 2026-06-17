# PluckNote App Store 截图生成器 (Code-only)

> 完全用代码生成 5 张 App Store 截图，含 iPhone / iPad / Mac 设备外壳，**零设计软件、零水印、零订阅**。

## 工作流

```
1. 准备 5 张 iPhone 截图
2. node render.js (Puppeteer 渲染)
3. 上传 output-final/*.png 到 App Store
```

## 目录结构

```
app-store-screenshots/
├── final/                    # ← 你在这里
│   ├── 01-hero.html         # 截图 1: Hero (拨动一根弦)
│   ├── 02-privacy.html      # 截图 2: Privacy (只有你能读)
│   ├── 03-someday.html      # 截图 3: Someday (Someday Inbox)
│   ├── 04-cross-platform.html  # 截图 4: Cross-Platform (一次购买)
│   ├── 05-pricing.html      # 截图 5: Pricing (¥38 永久)
│   ├── render.js            # Puppeteer 渲染脚本
│   ├── styles/
│   │   └── iphone-frame.css # iPhone/iPad/Mac 设备外壳 CSS
│   ├── screens/             # 你的 5 张 iPhone 截图放在这里
│   │   ├── .gitkeep
│   │   ├── 01-today.png
│   │   ├── 02-privacy.png
│   │   ├── 03-someday.png
│   │   ├── 04a-iphone.png   # 跨平台截图：iPhone
│   │   ├── 04b-ipad.png     # 跨平台截图：iPad
│   │   ├── 04c-mac.png      # 跨平台截图：Mac
│   │   └── 05-pricing.png
│   └── README.md
└── output-final/            # 5 张最终 PNG (渲染后)
    ├── 01-hero-final.png
    ├── 02-privacy-final.png
    ├── 03-someday-final.png
    ├── 04-cross-platform-final.png
    └── 05-pricing-final.png
```

## 步骤

### 1. 准备截图

把以下 6 张截图放到 `final/screens/` 目录（PNG，1290×2796 或更高）：

| 文件名 | 内容 |
|---|---|
| `01-today.png` | 今日列表（4-5 条任务） |
| `02-privacy.png` | 隐私 / "我们不接触你的笔记" 卡片 |
| `03-someday.png` | Someday 收件箱（4-5 条无日期任务） |
| `04a-iphone.png` | iPhone 上的 PluckNote（任何界面） |
| `04b-ipad.png` | iPad 上的 PluckNote |
| `04c-mac.png` | Mac 上的 PluckNote |
| `05-pricing.png` | 设置页 / Premium 解锁页 |

> 截图来源建议：
> - 实机截图（iPhone / iPad / Mac 真机）
> - iOS Simulator → Cmd+S
> - Xcode → Debug → Simulate Location → Custom Location
> - 用 Preview.app / sips 调整尺寸到 1290×2796

### 2. 安装依赖

```bash
cd app-store-screenshots
npm install
```

（首次安装 Puppeteer 内置 Chromium 约 170MB）

### 3. 渲染

```bash
node final/render.js
```

输出在 `output-final/`，共 5 张 1290×2796 PNG。

### 4. 上传 App Store

到 App Store Connect → App Store → 截图，**按顺序**上传 5 张：

| 顺序 | 文件 | 主题 |
|---|---|---|
| 1 | `01-hero-final.png` | Hero / 价值主张 |
| 2 | `02-privacy-final.png` | 隐私承诺 |
| 3 | `03-someday-final.png` | Someday |
| 4 | `04-cross-platform-final.png` | 跨平台 |
| 5 | `05-pricing-final.png` | 定价 CTA |

> 5 张图按此顺序展示给用户。第一张最关键——决定用户是否"了解更多"。

## 5 张截图的文案

| # | 主题 | 主标题 | 副标 |
|---|---|---|---|
| 1 | Hero | 拨动一根弦 / 记下一个想法 | iPhone · iPad · Mac |
| 2 | Privacy | 只有你能读 | PluckNote 不接触你的笔记... |
| 3 | Someday | 想到的事 / 先放进 Someday | 不必给它定日期 |
| 4 | Cross-Platform | 一次购买 / 全平台解锁 | iPhone · iPad · Mac · Widget |
| 5 | Pricing | 一次买断 / ¥38 永久 | 没有订阅 · 跨设备通用 |

## 配色 (与主页一致)

| 用途 | HEX |
|---|---|
| 主蓝 (Brand) | `#5B7CDB` |
| 浅蓝背景 | `#EEF2FB` |
| 深蓝 | `#4458B0` |
| 暖灰背景 | `#FAF8F8` |
| 标题色 | `#1a1a1a` |
| 副标色 | `#555` |
| Accent 暖黄 | `#FFD66B` |
| 深色背景 | `#1a1a1a` → `#2a2a2a` |

## 调优指南

如需调整：

| 改什么 | 在哪里 |
|---|---|
| 字体大小 | 各 HTML 文件中的 `font-size` |
| 颜色 | 各 HTML 文件中的 `color: #xxxxxx` |
| iPhone 大小 | `01-hero.html` 等中的 `.iphone-frame { width: 540px; height: 1180px }` |
| 灵动岛位置 | `styles/iphone-frame.css` 中的 `.dynamic-island` |
| 边框颜色 | `iphone-frame.css` 中的 `.iphone-frame` background gradient |
| 截图不显示 | 检查 `screens/` 文件名拼写 |

## 常见问题

### Q：Puppeteer 报"无法启动 Chrome"
安装 Puppeteer 内置 Chromium；或用 `puppeteer-core` + 本地 Chrome。

### Q：截图中的 iPhone 外壳看起来"假"
CSS-only 模仿的极限是 80% 真实感。如需 100%，可叠加 1 张高分辨率的 Apple 官方 iPhone 外壳 PNG（用 Figma / GIMP 简单处理）。

### Q：能否做英文版？
可以。复制 5 个 HTML 文件，重命名 `01-hero-en.html` 等，替换文案，单独渲染。

### Q：能否做 iPhone 5.5" / 6.5" 尺寸？
可以。修改 `render.js` 中的 `WIDTH = 1242, HEIGHT = 2688`（6.5"）或 `HEIGHT = 2208`（5.5"）。

### Q：能否做 iPad / Mac App Store 截图？
可以。复用 `04-cross-platform.html` 作为模板。

## 许可

本目录内部使用。HTML 模板与 CSS 可自由修改。
