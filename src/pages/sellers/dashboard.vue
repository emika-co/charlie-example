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
        <div class="col-12 app-link mr-5 p-3">
          <div class="float-left mr-3">
            <img src="~/assets/coffee.svg" class="icon-link">
          </div>
          <span>ถอนรายได้</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3">
          <div class="float-left mr-3">
            <img src="~/assets/file.svg" class="icon-link">
          </div>
          <span>ประวัติการถอนรายได้</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3">
          <div class="float-left mr-3">
            <img src="~/assets/file.svg" class="icon-link">
          </div>
          <span>ประวัติการขายสินค้า</span>
        </div>
        <div class="col-12">
          <hr class="my-0">
        </div>
        <div class="col-12 app-link mr-5 p-3">
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
// import Swal from 'sweetalert2'
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'seller',
  middleware: ['seller'],
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
        firestore.collection('sellers').doc(this.store.id).onSnapshot((doc) => {
          const store = doc.data()
          this.dashboard = store.dashboard
        })
      }
    },
    goTo (url) {
      this.$store.dispatch('goToPage', url)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 0px 0px 20px 20px;
}
.green-checker {
  filter: invert(48%) sepia(90%) saturate(2800%) hue-rotate(86deg)
    brightness(90%) contrast(119%);
  width: 30px;
  margin-top: -2px;
}
.w-fit-content {
  width: fit-content;
}
.text-muted {
  font-size: 0.7rem;
}
#add-to-cart {
  width: 95px;
  margin-left: -15px;
}
.files input {
    outline: 2px dashed #92b0b3;
    outline-offset: -10px;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    padding: 120px 0px 85px 35%;
    text-align: center !important;
    margin: 0;
    width: 100% !important;
}
.files input:focus{     outline: 2px dashed #92b0b3;  outline-offset: -10px;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear; border:1px solid #92b0b3;
 }
.files{ position:relative}
.files:after {  pointer-events: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 50px;
    right: 0;
    height: 56px;
    content: "";
    background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
    display: block;
    margin: 0 auto;
    background-size: 100%;
    background-repeat: no-repeat;
}
.color input{ background-color:#f1f1f1;}
.files:before {
    position: absolute;
    bottom: 10px;
    left: 0;  pointer-events: none;
    width: 100%;
    right: 0;
    height: 57px;
    content: " or drag it here. ";
    display: block;
    margin: 0 auto;
    padding-top: 20px;
    color: #2ea591;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
}
.bg-white {
  background-color: #FFFFFF;
}
.money {
  font-size: 2.3rem;
}
.icon-link {
  margin-top: -3px;
}
</style>
