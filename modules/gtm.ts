import { Module } from "@nuxt/types";
const path = require("path");

interface Options {
  id: string;
  layer?: string;
  scriptURL?: string;
  scriptId?: string;
}

const defaultOptions = {
  scriptId: "gtm-script",
  layer: "dataLayer",
  scriptURL: "https://www.googletagmanager.com/gtm.js"
};

const gtmModule: Module<Options> = function(_options) {
  const options = Object.assign({}, defaultOptions, _options, this.options.gtm);
  console.log("gtmModule:", { options });
  const queryString = `id=${options.id}&l=${options.layer}`;

  const initLayer =
    "w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'})"; // deps: w,l
  const injectScript = `var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='${options.scriptURL}?${queryString}';f.parentNode.insertBefore(j,f);}`; // deps: d,s
  const script = `(function(w,d,s,l){${initLayer};${injectScript})(window,document,'script','${options.layer}');`;

  const head: any = this.options.head;
  head.script = head.script || [];
  head.script.push({
    hid: options.scriptId!,
    innerHTML: script
  });
  // Disable sanitazions
  head.__dangerouslyDisableSanitizersByTagID =
    head.__dangerouslyDisableSanitizersByTagID || {};
  head.__dangerouslyDisableSanitizersByTagID[options.scriptId!] = ["innerHTML"];

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, "gtm_plugin.js"),
    fileName: "gtm.js",
    ssr: false,
    options
  });
};

export default gtmModule;
