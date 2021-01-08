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
    <div class="row">
      <div class="col-12">
        <p class="text-muted mb-0">
          อีเมลล์เพื่อรับลิงค์ดาวน์โหลด
        </p>
      </div>
    </div>
    <div class="row mb-3 bg-white py-2">
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
    <div class="row mb-3 bg-white py-2">
      <div class="col mx-2">
        <payment-method v-for="(method, index) in paymentMethods" :key="index" :name="method.name" :img-cover="method.imgCover" />
      </div>
    </div>
    <!-- <div class="row pt-2 bg-white">
      <div class="col-12">
        <button class="btn btn-outline-primary w-100">
          <div class="w-fit-content mx-auto">
            โอนผ่านธนาคาร
          </div>
        </button>
      </div>
      <div class="col-12 pt-10" style="padding-top:10px">
        <button class="btn btn-outline-primary w-100">
          <div class="w-fit-content mx-auto">
            บัตรเดบิต/เครดิต
          </div>
        </button>
      </div>
    </div> -->
    <div class="row" style="padding-top:50px">
      <div class="col-12">
        <button class="btn btn-primary w-100 bt-color">
          <div class="w-fit-content mx-auto">
            ดำเนินการต่อ
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { functions } from '~/plugins/firebase'
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
      paymentMethods: [
        {
          name: 'โอนผ่านแอพธนาคาร QR',
          imgCover: 'https://firebasestorage.googleapis.com/v0/b/charlie-296709.appspot.com/o/resources%2Fpayment-methods%2Fpromptpay.svg?alt=media&token=9671ef86-1370-405c-bdf0-cb1ea255dd73'
        }
      ]
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    await this.getItem()
    this.$store.dispatch('setPageTitle', 'ยอดรวม 360 บาท')
    this.$store.dispatch('loading', false)
  },
  methods: {
    async getItem () {
      this.$store.dispatch('loading', true)
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
      this.$store.dispatch('loading', false)
    }
  }
}
</script>

<style scoped>
</style>
