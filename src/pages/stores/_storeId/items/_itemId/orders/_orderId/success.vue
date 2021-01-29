<template>
  <div class="d-flex justify-content-center vh100">
    <div class="align-self-center rounded mx-4">
      <div class="bg-white p-3">
        <div class="text-center mb-4">
          <img src="~/assets/check-circle.svg">
        </div>
        <div class="text-center mb-3">
          <p class="mx-3 mb-4">
            การสั่งซื้อสำเร็จ เราได้รับยอดชำระเงินของคุณแล้ว
          </p>
          <p class="text-muted sub-text">
            เราได้ส่งใบเสร็จรับเงินไปที่อีเมลล์ {{ user.email }}
          </p>
        </div>
        <hr class="w-25">
        <item-no-cover :name="item.name" :store-name="item.storeName" :cost="item.cost" class="mb-3" />
        <a :href="item.files[0]" target="__blank" class="btn btn-primary w-100 mb-3">
          ดาวน์โหลดเลย
        </a>
        <hr class="dot">
        <div class="text-muted sub-text text-center">
          ขอบคุณที่สนับสนุนผู้ผลิตเนื้อหา
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vh100 {
  height: 100vh
}
.dot {
  border: 1px dashed rgba(0, 0, 0, 0.05);
}
</style>

<script>
import { functions } from '~/plugins/firebase'
export default {
  layout: 'default',
  data () {
    return {
      item: {
        itemId: '',
        name: '',
        cost: 0,
        covers: [],
        description: '',
        storeName: '',
        sold: 0,
        tags: [],
        createdAt: {},
        updatedAt: {},
        files: []
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/getUser']
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    await this.getItem()
    this.$store.dispatch('loading', false)
  },
  methods: {
    async getItem () {
      const getItem = functions.httpsCallable('getItem')
      try {
        const result = await getItem({
          itemId: this.$route.params.itemId
        })
        if (result.data) {
          this.item = result.data
        } else {
          this.$router.push('/_')
        }
      } catch (error) {
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          error.message,
          'error'
        )
      }
    }
  }
}
</script>
