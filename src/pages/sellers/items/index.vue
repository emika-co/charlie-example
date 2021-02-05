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
      @editItem="editItem"
    />
    <div class="row">
      <nuxt-link to="/sellers/items/create" class="create-box files text-center w-100 mx-2 mb-3">
        <img src="~/assets/file-plus.svg">
        <p class="mb-0">
          ลงสินค้าใหม่
        </p>
      </nuxt-link>
    </div>
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
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'view',
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
    store () {
      return this.$store.getters['seller/getStore']
    }
  },
  async created () {
    try {
      this.$store.dispatch('setPageTitle', 'สินค้าของฉัน')
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
      if (this.store.id) {
        const itemRef = firestore.collection('items').where('sid', '==', this.store.id).orderBy('createdAt', 'desc')
        const snapshot = await itemRef.get()
        this.totalItem = snapshot.size
        await this.fetchItems(1)
      }
    },
    async loadNext () {
      const page = this.currentPage + 1
      if (page > this.totalPage) {
        return
      }
      this.$store.dispatch('loading', true)
      await this.fetchItems(page)
      this.$store.dispatch('loading', false)
    },
    async loadPrevious () {
      const page = this.currentPage - 1
      if (page < 1) {
        return
      }
      this.$store.dispatch('loading', true)
      await this.fetchItems(page)
      this.$store.dispatch('loading', false)
    },
    async fetchItems (page) {
      const itemRef = firestore.collection('items').where('sid', '==', this.store.id).orderBy('createdAt', 'desc')
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
    },
    editItem (itemId) {
      this.$router.push(`/sellers/items/${itemId}/edit`)
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
