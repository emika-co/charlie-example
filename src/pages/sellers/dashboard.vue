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
            เมนูสำหรับผู้ขาย
          </span>
        </div>
      </div>
      <div class="row bg-white px-3">
        <div class="col-12 app-link mr-5 p-3" @click="goTo('/sellers/items')">
          <div class="float-left mr-3">
            <img src="~/assets/package.svg" class="icon-link">
          </div>
          <span>สินค้าของฉัน</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3" @click="goTo('/sellers/withdraw')">
          <div class="float-left mr-3">
            <img src="~/assets/coffee.svg" class="icon-link">
          </div>
          <span>ถอนรายได้</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3" @click="goTo('/sellers/withdraw/history')">
          <div class="float-left mr-3">
            <img src="~/assets/file.svg" class="icon-link">
          </div>
          <span>ประวัติการถอนรายได้</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3 disabled">
          <div class="float-left mr-3">
            <img src="~/assets/file.svg" class="icon-link">
          </div>
          <span>ประวัติการขายสินค้า</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3 disabled">
          <div class="float-left mr-3">
            <img src="~/assets/setting.svg" class="icon-link">
          </div>
          <span>แก้ไขข้อมูลร้านค้า</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'seller',
  middleware: ['auth', 'seller'],
  data () {
    return {
      dashboard: {
        totalWealth: 0,
        updatedAt: new Date()
      }
    }
  },
  computed: {
    store () {
      return this.$store.getters['seller/getStore']
    }
  },
  created () {
    this.$store.dispatch('loading', true)
    this.$store.dispatch('setPageTitle', 'แดชบอร์ดผู้ขาย')
    this.getDashboard()
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
    goTo (url) {
      this.$router.push(url)
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
