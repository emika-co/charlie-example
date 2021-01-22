<template>
  <div class="d-flex justify-content-center vh100">
    <div class="align-self-center text-center w-100 mx-3">
      <div class="card mb-3">
        <div class="card-header px-5 w-100">
          <img src="~/assets/thai-qr-payment.svg" class="img-fluid">
        </div>
        <div class="card-body pb-1">
          <img :src="qrCode" class="img-fluid mb-2">
          <p class="mb-1">
            ยอดชำระ (บาท)
          </p>
          <h3>{{ cost(order.item.cost) }}</h3>
        </div>
        <hr class="dot-line mt-0">
        <p>บริษัท เอมิกา ไอที แอนด์ คอนซัลติ้ง จำกัด</p>
      </div>
      <button class="w-100 btn btn-outline-primary" @click="downloadImg()">
        บันทึกภาพ QR
      </button>
    </div>
  </div>
</template>

<script>
import { firestore } from '~/plugins/firebase'
export default {
  name: 'QRCode',
  layout: 'public',
  middleware: ['auth'],
  data () {
    return {
      qrData: {
        createdAt: '',
        data: {
          qrImage: '',
          qrRawData: '',
          ref1: '',
          ref2: ''
        },
        method: '',
        oid: '',
        uid: '',
        updatedAt: ''
      },
      order: {
        item: {
          cost: 0
        }
      }
    }
  },
  computed: {
    qrCode () {
      return 'data:image/png;base64,' + this.qrData.data.qrImage
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    await this.getQR()
    await this.getOrder()
    this.checkTimeOut()
    this.$store.dispatch('loading', false)
  },
  methods: {
    async getQR () {
      const ref = firestore.collection('thaiQR').doc(this.$route.params.orderId)
      const snapshot = await ref.get()
      if (snapshot.exists) {
        this.qrData = snapshot.data()
      }
    },
    async getOrder () {
      await firestore.collection('orders').doc(this.qrData.oid).onSnapshot((doc) => {
        this.order = doc.data()
        if (this.order.status === 'S') {
          this.$router.push({
            name: 'stores-storeId-items-itemId-orders-orderId-success',
            params: {
              storeId: this.$route.params.storeId,
              itemId: this.$route.params.itemId,
              orderId: this.$route.params.orderId
            }
          })
        }
      })
    },
    cost (val) {
      if (isNaN(val)) {
        return ''
      }
      return val.toFixed(2)
    },
    checkTimeOut () {
      const timeOut = this.$moment(this.qrData.createdAt.toDate()).add(15, 'm')
      const now = this.$moment()
      if (now > timeOut) {
        this.$router.push({
          name: 'stores-storeId-items-itemId',
          params: {
            storeId: this.$route.params.storeId,
            itemId: this.$route.params.itemId
          }
        })
      }
    },
    downloadImg () {
      const imgString = 'data:application/octet-stream;base64,' + this.qrData.data.qrImage
      const fileName = Math.floor(Date.now() / 1000) + '.png'
      const downloadLink = document.createElement('a')
      downloadLink.href = imgString
      downloadLink.download = fileName
      downloadLink.click()
    }
  }
}
</script>

<style scoped>
.vh100 {
  height: 100vh;
}
.card {
  border: none;
}
.card-header {
  background-color: #113566;
  padding: 0;
}
.dot-line {
  border: 1px dashed rgba(0, 0, 0, 0.05);
}
</style>
