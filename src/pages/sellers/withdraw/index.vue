<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="align-self w-100">
      <div class="row mt-3 p-3 bg-white">
        <div class="col-12">
          <div class="float-left mr-2">
            <img src="~/assets/credit-card.svg" class="mr-3">{{ store.name }}
          </div>
          <div class="float-right">
            <p>รายการที่ถอนได้</p>
          </div>
        </div>
        <div class="col-12">
          <p class="text-right money">
            {{ dashboard.totalWealth }} ฿
          </p>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12">
          <span class="text-muted">
            รายละเอียดการถอน
          </span>
        </div>
      </div>
      <div class="row bg-white py-3 px-3">
        <div class="input-group mb-3">
          <div id="amount" class="w-100">
            จำนวนเงิน
          </div>
          <input
            v-model="amount"
            type="number"
            class="form-control p-0 text-default"
            aria-describedby="amount"
          >
          <div class="input-group-text">
            บาท
          </div>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12">
          <p class="text-muted text-center">
            เงินจะถูกโอนไปที่
          </p>
        </div>
      </div>
      <div class="row bg-white py-3">
        <div class="input-group mb-3 mx-3">
          <span id="accountName" class="input-group-text">ชื่อบัญชี</span>
          <input
            ref="accountName"
            v-model="accountName"
            type="text"
            class="form-control ml-auto col-6"
            aria-describedby="accountName"
            placeholder="ต้องระบุ"
          >
        </div>
        <div class="input-group mb-3 mx-3">
          <span id="accountNumber" class="input-group-text">เลขบัญชี</span>
          <input
            ref="accountNumber"
            v-model="accountNumber"
            type="text"
            class="form-control ml-auto col-6"
            aria-describedby="accountNumber"
            placeholder="ต้องระบุ"
          >
        </div>
        <div class="input-group mb-3 mx-3">
          <span id="accountNumber" class="input-group-text">ธนาคาร</span>
          <select v-model="bank" class="form-select form-control ml-auto col-6 text-muted" aria-describedby="bank" aria-label="bank">
            <option value="" selected>
              กรุณาเลือกธนาคาร
            </option>
            <option v-for="(b, index) in banks" :key="index" :value="b.id">
              {{ b.bankNameTH }}
            </option>
          </select>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12">
          <button class="btn btn-primary w-100 mb-3">
            <div class="w-fit-content mx-auto">
              ยืนยันการถอนเงิน
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'view',
  middleware: ['auth', 'seller'],
  data () {
    return {
      banks: [],
      dashboard: {
        totalWealth: 0,
        updatedAt: new Date()
      },
      amount: 0,
      accountName: '',
      accountNumber: '',
      bank: ''
    }
  },
  computed: {
    store () {
      return this.$store.getters['seller/getStore']
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    this.$store.dispatch('setPageTitle', 'ถอนรายได้')
    await this.getDashboard()
    await this.getBankList()
    this.$store.dispatch('loading', false)
  },
  methods: {
    getDashboard () {
      if (this.store.id) {
        firestore.collection('sellers').doc(this.store.id).onSnapshot((doc) => {
          const store = doc.data()
          this.dashboard = store.dashboard
        })
      }
    },
    async getBankList () {
      try {
        const bankRef = firestore.collection('banks')
        const snapshot = await bankRef.get()
        snapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          this.banks.push(data)
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.money {
  font-size: 2.3rem;
}
.icon-link {
  margin-top: -3px;
}
</style>
