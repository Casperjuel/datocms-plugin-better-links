<template>
  <div id="app"
    class="BetterLinks"
  >
    <Selecty :items="items" />

    <div @click.prevent="triggerAction" class="BetterLinks__action">
      <a href="#" class="flex items-center">
        <div class="h-6 w-6 relative mr-2">
          <div class="bar horizontal"></div>
          <div class="bar vertical"></div>
        </div>
        Create New {{ fieldName }}
      </a>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Selecty from './Selecty'

const items = [...Array(100)].map((_, id) => ({
  id, index: id, value: `item_${id}`, display: `Item ${id}`,
}))

export default {
  props: {
    plugin: Object,
  },

  components: {
    Selecty,
  },

  data() {
    const { field: { attributes: { label, api_key, validators } } } = this.plugin

    return {
      items,
      fieldName: label,
      fieldLinkId: validators.item_item_type.item_types[0],
      fieldApiKey: api_key,
    }
  },

  methods: {
    triggerAction() {
      this.plugin.createNewItem(this.fieldLinkId)
    },
  },
}
</script>

<style lang="scss">
.BetterLinks {
  @apply text-grey-darker flex;

  .bar {
    margin: 0 auto;
    background-color: var(--accent-color);
    position: absolute;
  }

  .horizontal {
    width: 70%;
    height: 20%;
    left: 15%;
    top: 40%;
  }

  .vertical {
    width: 20%;
    height: 70%;
    left: 40%;
    top: 15%;
  }

  &__action {
    padding: 5px;
    margin-left: 15px;

    &:hover {
      @apply bg-grey-lighter rounded;
    }

    a {
      @apply whitespace-no-wrap uppercase text-xs no-underline font-bold;
      color: var(--accent-color);
    }
  }
}

.Selecty__list__item.selected {
  background-color: var(--light-color);
}
</style>
