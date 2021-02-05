<template>
  <div class="container-fluid mt-3">
    <item
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :store-name="item.storeName"
      :cover-img="item.covers[0]"
      :download-link="item.files[0]"
    />
    <pagination
      class="mb-3"
      :total-page="totalPage"
      :current="currentPage"
      @loadNext="loadNext"
      @loadPrevious="loadPrevious"
      @goToPage="fetchItems"
    />
  </div>
</template>

<script>
import item from '../../components/user/history/UserItem.vue'
import Pagination from '../../components/Pagination.vue'
import { firestore } from '~/plugins/firebase'
export default {
  components: { item, Pagination },
  middleware: ['auth'],
  layout: 'app',
  data () {
    return {
      items: [],
      totalItem: 0,
      limit: 6,
      currentPage: 1,
      totalPage: 1
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/getUser']
    }
  },
  async created () {
    try {
      this.$store.dispatch('loading', true)
      await this.getItems()
      this.$store.dispatch('loading', false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return this.$swal.fire(
        'เกิดข้อผิดพลาด',
        '',
        'error'
      )
    }
  },
  methods: {
    async getItems () {
      if (this.user.uid) {
        const itemRef = firestore.collection('inventories').where('uid', '==', this.user.uid).orderBy('createdAt', 'desc')
        const snapshot = await itemRef.get()
        this.totalItem = snapshot.size
        this.totalPage = Math.ceil(this.totalItem / this.limit)
        await this.fetchItems(1)
      }
    },
    async loadNext () {
      this.$store.dispatch('loading', true)
      const page = this.currentPage + 1
      if (page > this.totalPage) {
        return
      }
      await this.fetchItems(page)
      this.$store.dispatch('loading', false)
    },
    async loadPrevious () {
      this.$store.dispatch('loading', true)
      const page = this.currentPage - 1
      if (page < 1) {
        return
      }
      await this.fetchItems(page)
      this.$store.dispatch('loading', false)
    },
    async fetchItems (page) {
      const itemRef = firestore.collection('inventories').where('uid', '==', this.user.uid).orderBy('createdAt', 'desc')
      const snapshot = await itemRef.get()
      this.items = []

      const startDoc = (page - 1) * this.limit
      const lastDoc = startDoc + this.limit
      for (let index = startDoc; index < lastDoc; index++) {
        if (index >= snapshot.size) {
          break
        }
        const i = snapshot.docs[index].data()
        i.id = snapshot.docs[index].id
        this.items.push(i)
      }
      this.currentPage = page
    }
  }
}
</script>
