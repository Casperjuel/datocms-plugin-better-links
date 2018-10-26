<template>
  <div id="app"
    class="BetterLinks text-grey-darker"
    @mouseleave="hideSearchResults"
    @blur="hideSearchResults"
    @keyup.down="downRecord"
    @keyup.up="upRecord"
    @keyup.enter="setSelectedRecord(highlightedRecord)"
  >
    <div
      class="flex justify-between border border-grey-light p-1 pr-2 pl-2 w-full"
    >
      <input
        v-model="searchValue"
        @click="showSearchResults"
        @keydown="() => {
          clearSelectedRecord()
          showSearchResults()
        }"
        type="text"
        class="outline-none flex-grow"
      >
      <div class="p-1 cursor-pointer">
        <div
          v-if="searchResultsVisible"
          @click="hideSearchResults"
          class="arrow-up"
          />
        <div
          v-else
          @click="showSearchResults"
          class="arrow-down"
        />
      </div>
    </div>

    <div v-if="searchResultsVisible" class="BetterLinks__list">
      <ul
        class="border-b max-h-32 overflow-auto"
        v-if="hasSearchResults"
      >
        <li
          v-for="record in searchResults"
          :key="record.id"
          @click="setSelectedRecord(record)"
          :class="{
            BetterLinks__list__item: true,
            selected: (
              record.value === selectedRecord
              || highlightedRecord && (
                record.value === highlightedRecord.value
              )
            )
          }"
        >{{ record.display }}</li>
      </ul>

      <div v-else class="border-b p-2 text-grey-dark">
        No results found
      </div>
    </div>
  </div>
</template>

<script>
const records = [...Array(100)].map((_, id) => ({
  id, index: id, value: `record_${id}`, display: `Record ${id}`,
}))

export default {
  props: {
    plugin: Object,
  },

  data() {
    return {
      searchValue: '',
      searchResultsVisible: false,
      selectedRecord: null,
      highlightedRecord: null,
      records,
    }
  },

  methods: {
    showSearchResults() {
      this.searchResultsVisible = true
    },

    hideSearchResults() {
      this.searchResultsVisible = false
    },

    setSelectedRecord(record) {
      this.searchValue = record.display
      this.selectedRecord = record
      this.hideSearchResults()
    },

    setHighlightedRecord(record) {
      this.highlightedRecord = record
    },

    clearSelectedRecord() {
      if (this.hasSelectedRecord) this.selectedRecord = null
    },

    nextRecord(type) {
      const { highlightedRecord, searchResults } = this

      let index = highlightedRecord ? highlightedRecord.index : -1

      index = type === 'down' ? index + 1 : index - 1

      this.setHighlightedRecord(searchResults[index])
    },

    downRecord() { this.nextRecord('down') },

    upRecord() { this.nextRecord('up') },
  },

  computed: {
    searchResults() {
      const searchValue = this.searchValue.toLowerCase()

      if (searchValue === '') return records

      return this.records.filter((record) => {
        const value = record.value.toLowerCase()
        const display = record.display.toLowerCase()

        if (this.hasSelectedRecord) return value === this.selectedRecord.value.toLowerCase()

        return value.includes(searchValue) || display.includes(searchValue)
      })
    },

    hasSearchResults() {
      return this.searchResults.length !== 0
    },

    hasSearchValue() {
      return this.searchValue.length !== 0
    },

    hasSelectedRecord() {
      return this.selectedRecord !== null
    },
  },
}
</script>

<style lang="scss">
.BetterLinks {
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
}

.BetterLinks__list__item.selected {
  background-color: var(--light-color);
}
</style>
