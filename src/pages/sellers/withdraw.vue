<template>
  <div class="container d-flex justify-content-center">
    <div class="align-self w-100">
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-6" style="padding-top:10px;">
          <div class="col-12">
            <a href="#">
              <div style="float:left;">
                <!-- <img src="/arrow_back.png" class="filter-blue" /> -->
                <span
                  class="material-icons"
                  style="color:#539AEE;padding-top: 5px;"
                >
                  arrow_back_ios
                </span>
              </div>
              <div>
                <div style="padding-top:5px">
                  <p>ย้อนกลับ</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6" style="padding-top: 15px;text-align: right;">
          <b>ถอนรายได้</b>
        </div>
      </div>
      <div class="row" style="padding: 10px;background-color: #FFFFFF;margin-top:10px">
        <div class="col-4" style="padding-top:10px;">
          <p>Odery Store</p>
        </div>
        <div class="col-8">
          <p class="text-muted" style="text-align: right;padding-top: 15px;">
            รายการที่ถอนได้
          </p>
        </div>
        <div class="col-12">
          <p style="text-align: right; font-size: 34px;">
            34,000 ฿
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:20px;">
        <div class="col-12">
          <p class="text-muted">
            รายละเอียดการถอน
          </p>
        </div>
      </div>
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-10">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;" value="30,000">
        </div>
        <div class="col-2" style="padding-top:5px;">
          <p style="text-align: right;">
            บาท
          </p>
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
      </div>
      <div class="row" style="padding-top:20px;">
        <div class="col-12">
          <p class="text-muted" style="text-align: center;">
            รายละเอียดการถอน
          </p>
        </div>
      </div>
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-4">
          <p style="padding:5px">
            ชื่อบัญชี
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            เลขบัญชี
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            ธนาคาร
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
      </div>
      <div class="row" style="padding-top:10px">
        <div class="col-12">
          <button class="btn btn-primary w-100" style="margin-bottom: 20px;">
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
export default {
  // layout: "app"
}
</script>

<style scoped>
</style>
