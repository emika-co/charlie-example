<template>
  <div class="container-fluid">
    <div class="row mt-3 p-3 bg-white">
      <div class="col-12">
        <div class="float-left mr-2">
          <img src="~/assets/credit-card.svg" class="mr-3">{{ store.name }}
        </div>
        <div class="float-right text-muted">
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
    <div class="row bg-white py-3 mx-3 bank-account-form">
      <div class="input-group mb-3 mx-3">
        <span id="accountName" class="input-group-text">ชื่อบัญชี</span>
        <span class="ml-auto col-6 my-auto text-muted">{{ seller.bankAccount.accountName }}</span>
      </div>
      <div class="input-group mb-3 mx-3">
        <span id="accountNumber" class="input-group-text">เลขบัญชี</span>
        <span class="ml-auto col-6 my-auto text-muted">{{ seller.bankAccount.accountNumber }}</span>
      </div>
      <div class="input-group mb-3 mx-3">
        <span id="accountNumber" class="input-group-text">ธนาคาร</span>
        <span class="ml-auto col-6 my-auto text-muted">{{ seller.bankAccount.bank }}</span>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-12">
        <button class="btn btn-primary w-100 mb-3">
          <div class="w-fit-content mx-auto">
            ยืนยันการถอนเงิน
          </div>
        </button>
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
      dashboard: {
        totalWealth: 0,
        updatedAt: new Date()
      },
      amount: 0,
      seller: {
        bankAccount: {
          accountName: '',
          accountNumber: '',
          bank: ''
        }
      }
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
    await this.getSellerInfo()
    this.$store.dispatch('loading', false)
  },
  methods: {
    getDashboard () {
      if (this.store.id) {
        firestore.collection('sellerDashboards').doc(this.store.id).onSnapshot((doc) => {
          const store = doc.data()
          this.dashboard = store
        })
      }
    },
    async getSellerInfo () {
      const sellerRef = firestore.collection('sellers').doc(this.store.id)
      const sellerSnapshot = await sellerRef.get()
      if (!sellerSnapshot.exists) {
        return
      }
      const sellerResult = sellerSnapshot.data()
      this.seller.bankAccount.accountName = sellerResult.bankAccount.accountName
      this.seller.bankAccount.accountNumber = sellerResult.bankAccount.accountNumber
      const bank = await sellerResult.bankAccount.bank.get()
      if (bank.exists) {
        this.seller.bankAccount.bank = bank.id
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
.bank-account-form {
  border: 1px dashed #E5E5E5;
  border-radius: 5px;
}
</style>
