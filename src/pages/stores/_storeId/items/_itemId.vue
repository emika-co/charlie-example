<template>
  <div class="container">
    <div class="align-self w-100">
      <div class="row my-2">
        <div class="col">
          <span>
            {{ item.name }}
          </span>
        </div>
        <div class="col ml-auto my-auto text-right">
          <button id="add-to-cart" class="btn btn-primary w-fit-content">
            <span class="material-icons mr-2 float-left">
              add_shopping_cart
            </span>
            <span class="float-right">
              {{ item.cost }}฿
            </span>
          </button>
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
          <div>
            {{ item.description }}
          </div>
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
                <div class="col-12">
                  <div class="float-left mr-2">
                    <img src="~/assets/check.svg" class="green-checker">
                  </div>
                  <div>
                    <p>รับรองคุณภาพโดย Charlie</p>
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
                <button class="btn btn-primary w-100">
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
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  async created () {
    await this.getItem()
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
.container {
  height: 100vh;
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
</style>
