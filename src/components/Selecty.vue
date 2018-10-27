<template>
  <div
    @mouseleave="hideSearchResults"
    @blur="hideSearchResults"
    @keydown.down="downItem"
    @keydown.up="upItem"
    @keyup.enter="setSelectedItem(highlightedItem)"
    class="Selecty"
  >

    <div class="Selecty__container">
      <input
        v-model="searchValue"
        @click="showSearchResults"
        @keydown="() => {
          clearSelectedItem()
          showSearchResults()
        }"
        type="text"
        class="Selecty__input" />

      <div @click="toggleSearchResults" class="Selecty__actions">
        <slot v-if="searchResultsVisible" name="upArrow">
          <div class="Selecty__arrow Selecty__arrow--up" />
        </slot>

        <slot v-else name="downArrow">
          <div class="Selecty__arrow Selecty__arrow--down" />
        </slot>
      </div>
    </div>

    <div v-if="searchResultsVisible" class="Selecty__list">
      <DynamicScroller
        v-if="hasSearchResults"
        :items="searchResults"
        :min-item-height="32"
        :item-height="32"
        :buffer="0"
        class="Selecty__scroller"
        ref='scroller'
      >
        <template slot-scope="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :size-dependencies="[ item.display ]"
            :data-index="index"
          >
            <div
              :key="item.id"
              @click="setSelectedItem(item)"
              @mouseenter="setHighlightedItem(item)"
              :id="`bl-item-${index}`"
              :class="{
              Selecty__list__item: true,
              selected: (
                (selectedItem && item.id === selectedItem.id)
                || highlightedItem && (item.id === highlightedItem.id)
              )}"
            >
              <slot name="item" :data="item">
                {{ item.display }}
              </slot>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <slot v-else name="noResults">
        <div class="Selecty__no-results">
          No results found
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

export default {
  name: 'Selecty',

  props: {
    items: Array,
  },

  components: {
    DynamicScroller,
    DynamicScrollerItem,
  },

  data() {
    return {
      searchValue: '',
      searchResultsVisible: false,
      selectedItem: null,
      highlightedItem: null,
    }
  },

  methods: {
    showSearchResults() {
      this.searchResultsVisible = true
    },

    hideSearchResults() {
      this.searchResultsVisible = false
      this.highlightedItem = null
    },

    toggleSearchResults() {
      if (this.searchResultsVisible) {
        this.searchResultsVisible = false
        this.highlightedItem = null
      } else {
        this.searchResultsVisible = true
      }
    },

    setSelectedItem(item) {
      this.searchValue = item.display
      this.selectedItem = item
      this.hideSearchResults()
    },

    setHighlightedItem(item) {
      this.highlightedItem = item
    },

    clearSelectedItem() {
      if (this.hasSelectedItem) this.selectedItem = null
    },

    nextItem(type) {
      const { highlightedItem, searchResults } = this

      let index = highlightedItem
        ? searchResults.findIndex(item => item.id === highlightedItem.id)
        : -1

      index = type === 'down' ? index + 1 : index - 1

      if (index === searchResults.length) return

      this.setHighlightedItem(searchResults[index])

      const { scroller } = this.$refs

      if (!scroller) return

      const target = document.getElementById(`bl-item-${index}`)

      if (target) return

      this.$refs.scroller.$el.scrollTop += (type === 'down' ? 32 : -32)
    },

    downItem() { this.nextItem('down') },

    upItem() { this.nextItem('up') },
  },

  computed: {
    searchResults() {
      const searchValue = this.searchValue.toLowerCase()

      if (searchValue === '') return this.items

      return this.items.filter((item) => {
        const value = item.value.toLowerCase()
        const display = item.display.toLowerCase()

        if (this.hasSelectedItem) return value === this.selectedItem.value.toLowerCase()

        return value.includes(searchValue) || display.includes(searchValue)
      })
    },

    hasSearchResults() {
      return this.searchResults.length !== 0
    },

    hasSearchValue() {
      return this.searchValue.length !== 0
    },

    hasSelectedItem() {
      return this.selectedItem !== null
    },
  },
}
</script>

<style lang="scss">
.Selecty {
  @apply w-full select-none;

  &__container {
    @apply flex justify-between border border-grey-light p-1 pr-2 pl-2;
  }

  &__input {
    @apply outline-none flex-grow;
  }

  &__scroller {
    @apply border-b max-h-32 overflow-y-auto;
  }

  &__no-results {
    @apply border-b p-2 text-grey-dark;
  }

  &__actions {
    @apply p-1 cursor-pointer;
  }

  &__list {
    @apply border border-grey-light border-t-0 border-b-0;

    &__item {
      @apply p-2 border-grey-light border-t cursor-pointer;

      &:first-child { @apply border-t-0 }

      &:hover {
        background-color: var(--light-color);
      }
    }
  }

  &__arrow {
    border-style: solid;
    display: inline-block;

    &--down {
      border-color: #999 transparent transparent;
      border-width: 5px 5px 2.5px;
    }

    &--up {
      border-color: transparent transparent #999;
      border-width: 2.5px 5px 5px;
    }
  }
}
</style>
