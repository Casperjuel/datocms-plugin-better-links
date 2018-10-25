<template>
  <div>
    BetterLinks!
  </div>
</template>

<script>
export default {
  props: {
    plugin: Object,
  },

  mounted() {
    console.log(this.plugin)
  },
}
</script>
