<template>
  <div class="container d-flex justify-content-center" style="margin-top: 10px;">
    <div class="align-self w-100">
      <div class="row" style="background-color: #FFFFFF;margin-top: 10px;">
        <div class="col-4">
          <img src="/cat.jpg" class="payment" style="width: 70%;padding: 5px;">
        </div>
        <div class="col-8">
          <p style="margin-block-end: 0em;">
            ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา โดยอาจารย์กบ พ่อทุกสถาบัน
          </p>
          <p class="text-muted">
            Ordery Store
          </p>
        </div>
        <div class="col-12" style="text-align: right;padding-bottom: 10px;">
          <hr class="mt-0" style="margin-bottom: 10px;">
          <a href="#">
            แก้ไข
          </a>
        </div>
      </div>

      <div class="row" style="background-color: #FFFFFF;margin-top: 10px;">
        <div class="col-4">
          <img src="/cat.jpg" class="payment" style="width: 70%;padding: 5px;">
        </div>
        <div class="col-8">
          <p style="margin-block-end: 0em;">
            ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา โดยอาจารย์กบ พ่อทุกสถาบัน
          </p>
          <p class="text-muted">
            Ordery Store
          </p>
        </div>
        <div class="col-12" style="text-align: right;padding-bottom: 10px;">
          <hr class="mt-0" style="margin-bottom: 10px;">
          <a href="#">
            แก้ไข
          </a>
        </div>
      </div>
      <div class="col-12">
        <nuxt-link to="/sellers/items/create" class="btn btn-primary">
          ลงสินค้าใหม่
        </nuxt-link>
      </div>
    </div><!-- Modal -->
  </div>
</template>

<script>
export default {
  layout: 'view',
  created () {
    this.$store.dispatch('setPageTitle', 'สินค้าของฉัน')
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
}
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
</style>
