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
    <pagination class="mb-3" />
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
      limit: 25
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
        const limit = this.limit
        const itemRef = firestore.collection('inventories').where('uid', '==', this.user.uid).orderBy('createdAt', 'desc')
        const snapshot = await itemRef.get()
        this.totalItem = snapshot.size
        let index = 0
        while (index < limit && index < snapshot.size) {
          const i = snapshot.docs[index].data()
          i.id = snapshot.docs[index].id
          this.items.push(i)
          index++
        }
      }
    }
  }
}
</script>
