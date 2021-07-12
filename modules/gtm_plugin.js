export default function (ctx, inject) {
  const layer = '<%= options.layer %>'
  let initalized = false
  ctx.$gtm = {
    init() {
      if (!initalized && window.$initGTM) {
        window.$initGTM()
      }
      initalized = true
    },
    push(obj) {
      if (!window[layer]) {
        window[layer] = [{ 'gtm.start': new Date().getTime(), event: 'gtm.js' }]
      }
      window[layer].push(obj)
    }
  }
  inject('gtm', ctx.$gtm)

<% if (options.pageTracking) { %>
  console.log('set afterEach')
  ctx.app.router.afterEach((to) => {
    setImmediate(() => {
      const data = to.gtm || {
        routeName: to.name,
        pageType: 'PageView',
        pageUrl: to.fullPath,
        event: 'trackPageView'
      };
      console.log('$gtm push:', {data})
      ctx.$gtm.push(data);
    })
  })
<% } %>
}
