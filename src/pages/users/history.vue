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
    this.$store.dispatch('loading', true)
    await this.getItems()
    this.$store.dispatch('loading', false)
  },
  methods: {
    async getItems () {
      if (this.user.uid) {
        const itemRef = firestore.collection('inventories').where('uid', '==', this.user.uid).orderBy('createdAt', 'desc')
        const snapshot = await itemRef.get()
        this.totalItem = snapshot.size
        this.totalPage = Math.ceil(this.totalItem / this.limit)
        let index = 0
        while (index < this.limit && index < snapshot.size) {
          const i = snapshot.docs[index].data()
          i.id = snapshot.docs[index].id
          this.items.push(i)
          index++
        }
      }
    },
    async loadNext () {
      const page = this.currentPage + 1
      if (page > this.totalPage) {
        return
      }
      await this.fetchItems(page)
    },
    async loadPrevious () {
      const page = this.currentPage - 1
      if (page < 1) {
        return
      }
      await this.fetchItems(page)
    },
    async fetchItems (page) {
      this.$store.dispatch('loading', true)
      const lastDoc = this.totalPage * page
      const itemRef = firestore.collection('inventories').where('uid', '==', this.user.uid).orderBy('createdAt', 'desc').startAt(lastDoc).limit(this.limit)
      const snapshot = await itemRef.get()
      this.items = []
      let index = 0
      while (index < this.limit && index < snapshot.size) {
        const i = snapshot.docs[index].data()
        i.id = snapshot.docs[index].id
        this.items.push(i)
        index++
      }
      this.currentPage = page
      this.$store.dispatch('loading', false)
    }
  }
}
</script>
