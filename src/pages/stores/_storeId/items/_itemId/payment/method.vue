<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 pt-2">
        <p class="text-muted mb-0">
          ตะกร้าสินค้า
        </p>
      </div>
    </div>
    <basket-item :name="item.name" :store-name="item.storeName" :cover-img="item.covers[0]" :cost="item.cost" />
    <div v-if="!auth" class="row">
      <div class="col-12">
        <p class="text-muted mb-0">
          อีเมลล์เพื่อรับลิงค์ดาวน์โหลด
        </p>
      </div>
    </div>
    <div v-if="!auth" class="row mb-3 bg-white py-2">
      <div class="col-12">
        อีเมลล์
      </div>
      <div class="input-group mb-3 mx-3">
        <input
          ref="email"
          type="text"
          class="form-control px-0"
          placeholder="ระบุอีเมลล์ของคุณ"
          aria-describedby="email"
        >
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <p class="text-muted mb-0">
          โปรดเลือกวิธีการชำระเงิน
        </p>
      </div>
    </div>
    <div class="row mb-3 bg-white pt-2">
      <div class="col mx-2">
        <payment-method
          v-for="(method, index) in paymentMethods"
          :key="index"
          class="mb-2 payment-method"
          :name="method.displayTH"
          :img-cover="method.imgCover"
          :active="method.id == paymentId"
          @click.native="paymentMethod(method.id)"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary w-100 bt-color" @click="checkout()">
          ดำเนินการต่อ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { firestore, functions } from '~/plugins/firebase'
export default {
  layout: 'view',
  data () {
    return {
      item: {
        id: '',
        name: '',
        cost: 0,
        covers: [],
        description: '',
        storeName: '',
        sold: 0,
        tags: [],
        createdAt: {},
        updatedAt: {}
      },
      paymentMethods: [],
      paymentId: ''
    }
  },
  computed: {
    auth () {
      return this.$store.getters['user/isAuthenticated']
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    await this.getItem()
    await this.getPayments()
    if (this.paymentMethods[0]) {
      this.paymentId = this.paymentMethods[0].id
    }
    this.$store.dispatch('setPageTitle', `ยอดรวม ${this.item.cost} บาท`)
    this.$store.dispatch('loading', false)
  },
  methods: {
    async getItem () {
      const showItem = functions.httpsCallable('showItem')
      try {
        const result = await showItem({
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
    },
    async getPayments () {
      try {
        const ref = firestore.collection('payments')
        const snapshot = await ref.get()
        snapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          this.paymentMethods.push(data)
        })
      } catch (error) {
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          error.message,
          'error'
        )
      }
    },
    paymentMethod (pid) {
      this.paymentId = pid
    },
    async checkout () {
      this.$store.dispatch('loading', true)
      const buyItem = functions.httpsCallable('buyItem')
      try {
        const result = await buyItem({
          itemId: this.$route.params.itemId,
          paymentId: this.paymentId
        })
        this.$store.dispatch('loading', false)
        if (result.data.method === 'qr') {
          // REDIRECT TO QRCODE PAGE
          this.$router.push({
            name: 'stores-storeId-items-itemId-orders-orderId-qrcode',
            params: {
              storeId: this.$route.params.storeId,
              itemId: this.$route.params.itemId,
              orderId: result.data.oid
            }
          })
        }
      } catch (error) {
        this.$store.dispatch('loading', false)
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

<style scoped>
.payment-method {
  cursor: pointer;
}
</style>
