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
  </div>
</template>

<script>
import item from '../../components/user/history/UserItem.vue'
import { firestore } from '~/plugins/firebase'
export default {
  components: { item },
  middleware: ['auth'],
  layout: 'app',
  data () {
    return {
      items: []
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/getUser']
    }
  },
  async created () {
    this.$store.dispatch('setPageTitle', 'สินค้าของฉัน')
    this.$store.dispatch('loading', true)
    await this.getItems()
    this.$store.dispatch('loading', false)
  },
  methods: {
    async getItems () {
      if (this.user.uid) {
        const itemRef = firestore.collection('inventories').where('uid', '==', this.user.uid).orderBy('createdAt', 'desc').limit(25)
        const snapshot = await itemRef.get()
        snapshot.forEach((doc) => {
          const i = doc.data()
          i.id = doc.id
          this.items.push(i)
        })
      }
    }
  }
}
</script>
