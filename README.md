# nuxt-gtm-sample

Nuxt で GTM を使うモジュールのサンプル

nuxt.config.js でモジュールを設定

```
  modules: ["~/modules/gtm"],
  gtm: {
    id: process.env.GTM_ID,
    pageTracking: true
  },
```

pageTracking を true にするとトラッキング有効になります。

modules/gtm_plugin.js で data を設定すると任意の値を送れます。

テスト実行

```
$ GTM_ID=GTM-XXXX npm run dev
```
