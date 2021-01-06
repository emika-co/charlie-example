<template>
  <div class="container-fluid mt-3">
    <item
      v-for="(item, index) in items"
      :key="index"
      :item-id="item.id"
      :name="item.name"
      :cost="item.cost"
      :cover-img="item.covers[0]"
      @copyURL="copyURL"
    />
    <div class="row">
      <nuxt-link to="/sellers/items/create" class="create-box files text-center w-100 mx-2 mb-3">
        <img src="~/assets/file-plus.svg">
        <p class="mb-0">
          ลงสินค้าใหม่
        </p>
      </nuxt-link>
    </div>
    <pagination class="mb-3" />
  </div>
</template>

<script>
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'view',
  data () {
    return {
      items: [],
      totalItem: 0,
      limit: 25
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
        const limit = this.limit
        const itemRef = firestore.collection('items').where('sid', '==', this.store.id).orderBy('createdAt', 'desc')
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
    },
    async copyURL (itemId) {
      try {
        if (this.store.id) {
          const url = `${window.location.origin}/stores/${this.store.id}/items/${itemId}`
          await this.$copyText(url)
          this.$toast.success('คัดลอกลิ้งลงในคลิปบอร์ด')
          setTimeout(() => {
            this.$toast.clear()
          }, 3000)
        } else {
          throw new Error('URL not found')
        }
      } catch (error) {
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          '',
          'error'
        )
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
