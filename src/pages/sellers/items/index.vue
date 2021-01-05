<template>
  <div class="container-fluid mt-3">
    <item
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :cost="item.cost"
      :cover-img="item.covers[0]"
    />
    <div class="row">
      <nuxt-link to="/sellers/items/create" class="create-box files text-center w-100 mx-2 mb-3">
        <img src="~/assets/file-plus.svg">
        <p class="mb-0">
          ลงสินค้าใหม่
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'view',
  data () {
    return {
      items: []
    }
  },
  computed: {
    store () {
      return this.$store.getters['seller/getStore']
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
      if (this.store.id) {
        const itemRef = firestore.collection('items').where('sid', '==', this.store.id).orderBy('createdAt').limit(25)
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

<style scoped>
.create-box {
  color: #539AEE;
  border: 1px dashed #539AEE;
  border-radius: 5px;
  padding: 1.5rem;
  cursor: pointer;
}
</style>
