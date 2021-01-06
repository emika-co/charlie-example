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
          <b>สมัครเป็นผู้ขาย</b>
        </div>
      </div>
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="text-muted">
            รายละเอียดบัญชี
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;background-color: #FFFFFF;">
        <div class="col-4">
          <p style="padding:5px">
            ชื่อร้าน
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;" value="จิมมี่">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
      </div>
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="text-muted">
            รายละเอียดส่วนตัว (เพื่อออกใบกำกับภาษี)
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;background-color: #FFFFFF;">
        <div class="col-4">
          <p style="padding:5px">
            ชื่อ-นามสกุล
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            เบอร์ติดต่อ
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            เลขบัตรประชาชน
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            ที่อยู่
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            ตำบล/แขวง
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            อำเภอ/เขต
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            จังหวัด
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
        <div class="col-4">
          <p style="padding:5px">
            รหัสไปรษณี
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
      </div>
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="text-muted">
            รายละเอียดบัญชี
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;background-color: #FFFFFF;">
        <div class="col-4">
          <p style="padding:5px">
            ชื่อ-นามสกุล
          </p>
        </div>
        <div class="col-8">
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
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
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
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
          <input class="form-control" type="text" placeholder="ต้องระบุ" style="border: 0px;font-weight: 300;box-shadow: none;color:#539AEE;">
        </div>
        <div class="col-12">
          <hr class="mt-0" style="margin-top: -10px !important;">
        </div>
      </div>
      <div class="row" style="padding-top:10px">
        <div class="col-12">
          <button class="btn btn-primary w-100" style="margin-bottom: 20px;">
            <div class="w-fit-content mx-auto">
              ดำเนินการต่อ
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
</style>
