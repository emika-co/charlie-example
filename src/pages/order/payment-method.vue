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
        <div class="col-6" style="padding-top: 20px;">
          <p class="totalPayment">
            ยอดรวม 360 บาท
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="subjectPayment">
            ตะกร้าสินค้า
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;background-color: #FFFFFF;">
        <div class="col-4">
          <img src="/cat.jpg" class="payment">
        </div>
        <div class="col-8">
          <p>ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา...</p>
          <p class="text-muted">
            Ordery Store
          </p>
          <p>360 บาท</p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="subjectPayment">
            อีเมลล์เพื่อรับลิงค์ดาวน์โหลด
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;background-color: #FFFFFF;">
        <div class="col-12">
          อีเมลล์
        </div>
        <div class="col-12" style="padding-top: 10px;margin-bottom: 10px;">
          <input class="form-control" type="text" placeholder="ระบุอีเมลล์ของคุณ">
        </div>
      </div>
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="subjectPayment">
            โปรดเลือกวิธีการชำระเงิน
          </p>
        </div>
      </div>
      <div class="row" style="padding-top:10px;background-color: #FFFFFF;">
        <div class="col-12">
          อีเมลล์
        </div>
        <div class="col-12">
          <button class="btn btn-primary w-100">
            <div class="w-fit-content mx-auto">
              โอนผ่านธนาคาร
            </div>
          </button>
        </div>
        <div class="col-12">
          <button class="btn btn-primary w-100">
            <div class="w-fit-content mx-auto">
              บัตรเดบิต/เครดิต
            </div>
          </button>
        </div>
      </div>
      <div class="row" style="padding-top:10px">
        <div class="col-12">
          <button class="btn btn-primary w-100">
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
.text-muted {
  font-size: 0.7rem;
}
#add-to-cart {
  width: 95px;
  margin-left: -15px;
}
</style>
