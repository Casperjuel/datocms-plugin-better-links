<template>
  <div id="app" class="BetterLinks text-grey-darker">
    <div class="flex justify-between border border-grey-light p-1 pr-2 pl-2 w-full">
      <input type="text" class="outline-none flex-grow">
      <div class="p-1 cursor-pointer">
        <div class="arrow-down"></div>
      </div>
    </div>

    <div class="BetterLinks__list">
      <ul>
        <li class="BetterLinks__list__item" :style="listItemStyle">Record</li>
        <li class="BetterLinks__list__item">Record 2</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plugin: Object,
  },
}
</script>

<style lang="scss">
.BetterLinks {
  &__list {
    @apply border border-grey-light border-t-0;

    &__item {
      @apply p-2 border-grey-light border-t cursor-pointer;

      &:first-child { @apply border-t-0 }

      &:hover {
        background-color: var(--light-color);
      }
    }
  }
}
</style>
