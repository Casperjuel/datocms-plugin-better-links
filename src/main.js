import '~/scss/main.scss'
import Vue from 'vue'
import DatoCmsPlugin from 'datocms-plugins-sdk'
import { client } from '~/graphql'
import BetterLinks from '~/components/BetterLinks'

Vue.config.productionTip = false

Vue.prototype.$moo = 'cow'

DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer()

  const { global: { apiToken: token } } = plugin.parameters

  Vue.prototype.$graphql = client({
    url: 'https://graphql.datocms.com',
    token,
  })

  new Vue({
    render: h => h(BetterLinks, { props: { plugin } }),
  }).$mount('#app')
})
