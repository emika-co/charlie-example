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
    <div class="row mb-3 bg-white pt-2">
      <div class="col mx-2">
        <payment-method
          v-for="(method, index) in paymentMethods"
          :key="index"
          class="mb-2 payment-method"
          :name="method.name"
          :img-cover="method.imgCover"
          :active="method.id == paymentMethodId"
          @click.native="paymentMethod(method.id)"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary w-100 bt-color">
          ดำเนินการต่อ
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
          id: 1,
          name: 'โอนผ่านแอพธนาคาร QR',
          imgCover: 'https://firebasestorage.googleapis.com/v0/b/charlie-296709.appspot.com/o/resources%2Fpayment-methods%2Fpromptpay.svg?alt=media&token=9671ef86-1370-405c-bdf0-cb1ea255dd73'
        },
        {
          id: 2,
          name: 'บัตรเดบิต/เครดิต',
          imgCover: 'https://firebasestorage.googleapis.com/v0/b/charlie-296709.appspot.com/o/resources%2Fpayment-methods%2Fpaypal.svg?alt=media&token=1023fb9d-5c3b-4c7a-9026-092ffb7dadc7'
        }
      ],
      paymentMethodId: ''
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    await this.getItem()
    this.$store.dispatch('setPageTitle', `ยอดรวม ${this.item.cost} บาท`)
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
    },
    paymentMethod (pid) {
      this.paymentMethodId = pid
      console.log(pid)
    }
  }
}
</script>

<style scoped>
.payment-method {
  cursor: pointer;
}
</style>
