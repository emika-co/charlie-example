<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="previous()">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in total" :key="page" class="page-item">
        <a class="page-link" href="#">
          {{ page }}
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
    total: {
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
    },
    previous () {
    }
  }
}
</script>
