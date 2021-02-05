<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="previous()">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="(_, index) in totalPage" :key="index" class="page-item">
        <a v-if="showButton(index)" class="page-link" href="#" :class="{ 'active': isActive }" @click="goToPage(index)">
          {{ index + 1 }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="next()">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPage: {
      default: 1,
      type: Number
    },
    current: {
      default: 1,
      type: Number
    }
  },
  methods: {
    next () {
      this.$emit('loadNext')
    },
    previous () {
      this.$emit('loadPrevious')
    },
    goToPage (page) {
      this.$emit('goToPage', page + 1)
    },
    showButton (index) {
      if (index <= this.current + 1) {
        return true
      }
      return false
    },
    isActive (index) {
      if (this.current === index + 1) {
        return true
      }
      return false
    }
  }
}
</script>
