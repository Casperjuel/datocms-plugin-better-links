import Vue from 'vue'
import DatoCmsPlugin from 'datocms-plugins-sdk'
import './scss/main.scss'
import BetterLinks from './components/BetterLinks'

Vue.config.productionTip = false

DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer()

  new Vue({
    render: h => h(BetterLinks, { props: { plugin } }),
  }).$mount('#app')
})
