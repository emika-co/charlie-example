<template>
  <div class="container">
    <div class="row my-2">
      <div class="col my-auto">
        {{ item.name }}
      </div>
      <div class="col ml-auto text-right">
        <button v-b-modal.basket class="btn btn-primary w-fit-content">
          <span class="material-icons mr-2 float-left">
            add_shopping_cart
          </span>
          <span class="float-right">
            {{ item.cost }}฿
          </span>
        </button>
        <b-modal id="basket" title="ตะกร้าสินค้า" hide-footer centered>
          <template #modal-header="{ close }">
            <h5 class="modal-title">
              ตะกร้าสินค้า
            </h5>
            <span class="app-link" @click="close()">
              ยกเลิก
            </span>
          </template>
          <div class="row">
            <div class="col-4">
              <img class="img-fluid rounded" :src="item.covers[0]">
            </div>
            <div class="col-8">
              <p class="mb-0">
                {{ item.name }}
              </p>
              <p class="text-muted mb-0">
                {{ item.storeName }}
              </p>
              <p class="mb-0">
                <b>{{ item.cost }}</b> บาท
              </p>
            </div>
          </div>
          <div v-if="!isAuthenticated" class="text-center">
            <hr>
            <nuxt-link
              :to="{
                name: 'index',
                query: { redirect: $route.path }
              }"
              class="app-link"
            >
              คุณยังไม่ได้เข้าสู่ระบบ
            </nuxt-link>
          </div>
          <hr>
          <button class="btn btn-primary w-100" @click="paymentMethod()">
            ดำเนินการต่อ
          </button>
        </b-modal>
      </div>
    </div>
    <div class="row mb-3">
      <div class="w-100">
        <img class="w-100 img-fluid rounded" :src="item.covers[0]">
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <b>
          {{ item.name }}
        </b>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div id="description" class="overflow-auto" v-html="sanitizeHTML(item.description)" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="card w-100">
          <div class="card-body">
            <div class="row">
              <div class="col-4">
                <p><b>ราคา</b></p>
              </div>
              <div class="col-8 text-right">
                <span>
                  <b>{{ item.cost }}</b> ฿
                </span>
                <p class="text-muted">
                  ราคาที่แสดงรวมภาษีมูลค่าเพิ่มแล้ว
                </p>
              </div>
            </div>
            <hr class="mt-0">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="float-left mr-2">
                  <img src="~/assets/check.svg" class="green-checker">
                </div>
                <div>
                  <p>รับรองคุณภาพโดย Filolo App</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <div class="float-left mr-2">
                  <img src="~/assets/check.svg" class="green-checker">
                </div>
                <div>
                  <p>อัพเดทเนื้อหาในอนาคต</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <div class="float-left mr-2">
                  <img src="~/assets/check.svg" class="green-checker">
                </div>
                <div>
                  <p>บริการช่วยเหลือหลังการขาย 1 เดือน</p>
                </div>
              </div>
            </div>
            <div class="w-100">
              <button v-b-modal.basket class="btn btn-primary w-100">
                <div class="w-fit-content mx-auto">
                  <span class="material-icons mr-2 float-left">
                    add_shopping_cart
                  </span>
                  ซื้อสินค้านี้
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <span class="material-icons mr-2 float-left">
                  shopping_cart
                </span>
                {{ item.sold }} ขายแล้ว
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col-12 text-center">
        <p class="mb-0">
          © สงวนลิขสิทธิ์ โดย, {{ item.storeName }}
        </p>
        <a href="#">
          ติดต่อทีมงาน เพื่อขอความช่วยเหลือ
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { functions } from '~/plugins/firebase'
export default {
  layout: 'public',
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
      }
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['user/isAuthenticated']
    }
  },
  async created () {
    this.$store.dispatch('loading', true)
    await this.getItem()
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
    sanitizeHTML (html) {
      return this.$sanitize(this.item.description)
    },
    showBasket () {
      document.getElementById('basket')
    },
    paymentMethod () {
      this.$router.push({
        name: 'stores-storeId-items-itemId-payment-method',
        params: {
          storeId: this.$route.params.storeId,
          itemId: this.$route.params.itemId
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
