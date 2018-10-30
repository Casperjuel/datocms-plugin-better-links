export default ({ query } = {}) => ({
  request(...args) {
    return query ? query(...args) : {
      allRecords: [],
    }
  },
})
