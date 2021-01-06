<template>
  <div class="container">
    <div class="align-self w-100">
      <div class="row p-10 bg-white">
        <div class="col-6">
          <div class="col-12  pt-10">
            <a href="#">
              <div class="float-left">
                <!-- <img src="/arrow_back.png" class="filter-blue" /> -->
                <span
                  class="material-icons pt-3"
                >
                  arrow_back_ios
                </span><!-- style="color:#539AEE;padding-top: 5px;" -->
              </div>
              <div>
                <div class="pt-3">
                  <p>ย้อนกลับ</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 pt-3">
          <p class="text-right">
            ยอดรวม 360 บาท
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 pt-2">
          <p class="text-muted">
            ตะกร้าสินค้า
          </p>
        </div>
      </div>
      <div class="row pt-2 bg-white">
        <div class="col-4">
          <img src="/cat.jpg">
        </div>
        <div class="col-8">
          <p>ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา...</p>
          <p class="text-muted">
            Ordery Store
          </p>
          <p>360 บาท</p>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-12">
          <p class="text-muted">
            อีเมลล์เพื่อรับลิงค์ดาวน์โหลด
          </p>
        </div>
      </div>
      <div class="row pt-2 bg-white">
        <div class="col-12">
          อีเมลล์
        </div>
        <div class="col-12 pt-2 mb-2">
          <input
            class="form-control"
            type="text"
            placeholder="ระบุอีเมลล์ของคุณ"
          >
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-12">
          <p class="text-muted">
            โปรดเลือกวิธีการชำระเงิน
          </p>
        </div>
      </div>
      <div class="row pt-2 bg-white">
        <div class="col-12">
          โปรดเลือกวิธีการชำระเงิน
        </div>
        <div class="col-12">
          <button class="btn btn-outline-primary w-100">
            <div class="w-fit-content mx-auto">
              โอนผ่านธนาคาร
            </div>
          </button>
        </div>
        <div class="col-12 pt-10" style="padding-top:10px">
          <button class="btn btn-outline-primary w-100">
            <div class="w-fit-content mx-auto">
              บัตรเดบิต/เครดิต
            </div>
          </button>
        </div>
      </div>
      <div class="row" style="padding-top:50px">
        <div class="col-12">
          <button class="btn btn-primary w-100 bt-color">
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
.bt-colur {
  background: #539AEE;
}
.w-fit-content {
  width: fit-content;
}
</style>
