<template>
  <div id="app"
    class="BetterLinks"
  >
    <Selecty
      :items="items"
      :item-height="34"
      :scroller-max-height="34 * 4"
      v-model="selected"
      :searchValue.sync="searchValue"
      :loading="loading"
      placeholder="Select..."
    />

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
import { camelCase, startCase, pick } from 'lodash-es'
import Selecty from '~/components/Selecty'

export default {
  props: {
    plugin: Object,
  },

  components: {
    Selecty,
  },

  data() {
    const { field: { attributes: { api_key, validators } }, fieldPath, parameters } = this.plugin
    const { instance: { fields } } = parameters

    console.log(this.plugin)

    return {
      items: [],
      selected: null,
      loading: false,
      fieldName: fieldPath,
      fieldLinkId: validators.item_item_type?.item_types[0],
      fieldApiKey: api_key,
      searchValue: '',
      searchFields: fields.split(',').map(field => field.trim()),
    }
  },

  methods: {
    triggerAction() {
      this.plugin.createNewItem(this.fieldLinkId)
    },

    async searchItems(search) {
      let searchQuery = ''
      const { fieldName, searchFields } = this
      const linkedName = `${startCase(camelCase(fieldName))}s`
      const fields = searchFields?.map(field => camelCase(field))
      const queryField = `all${linkedName}`

      const searchPattern = field => `{
        ${field}: {
          matches: {
            pattern: "${search}"
          }
        }
      }`

      if (search !== '') {
        searchQuery = `OR: [${fields.map(field => searchPattern(field))}]`
      }

      const query = `query All${linkedName}{
        ${queryField}(${searchQuery}) {
          id
          ${fields.join('\n')}
        }
      }`

      const response = await this.$graphql.request(query)

      return response[queryField].map(({ id, ...field }) => ({
        id,
        value: id,
        display: Object.values(pick(field, fields)).join(' '),
      }))
    },
  },

  watch: {
    selected(value) {
      const { plugin } = this

      plugin.setFieldValue(plugin.fieldPath, value)
    },
  },

  async mounted() {
    const { plugin, searchItems, searchValue } = this

    this.selected = plugin.getFieldValue(plugin.fieldPath)

    this.unsubscribe = plugin.addFieldChangeListener(plugin.fieldPath, () => {
      this.selected = plugin.getFieldValue(plugin.fieldPath)
    })

    this.loading = true
    this.items = await searchItems(searchValue)
    this.loading = false
  },

  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe()
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
    margin-left: 12px;
    margin-top: 1px;

    a {
      padding: 5px;
      padding-right: 8px;
      @apply whitespace-no-wrap uppercase text-xs no-underline font-bold;
      color: var(--accent-color);

      &:hover {
        @apply bg-grey-lighter rounded;
      }
    }
  }
}

.Selecty__list__item.selected {
  background-color: var(--light-color);
}
</style>
