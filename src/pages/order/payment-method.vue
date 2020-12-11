<template>
  <div class="container d-flex justify-content-center">
    <div class="align-self w-100">
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-6" style="padding-top:10px;">
          <div class="col-12">
            <a href="#">
              <div style="float:left;">
                <!-- <img src="/arrow_back.png" class="filter-blue" /> -->
                <span class="material-icons" style="color:#539AEE;padding-top: 5px;">
                  arrow_back_ios
                </span>
              </div>
              <div>
                <div style="padding-top:10px">
                  <p class="back">ย้อนกลับ</p>
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
          <img src="/cat.jpg" class="payment" />
        </div>
        <div class="col-8">
          <p>ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา...</p>
          <p class="text-muted">Ordery Store</p>
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

<style>
.container {
  height: 100vh;
  /* ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา โดยอาจารย์กบ พ่อทุกสถาบัน */
}
p {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #324c5b;
}
p.back {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #539aee;
}
p.totalPayment {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 100%;
  display: block;
  text-align: right;
  color: #324c5b;
}
p.subjectPayment {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 335px;
  font-size: 13px;
  line-height: 100%;
  display: flex;
  color: #324c5b;
  line-height: 17.55px;
}
p.detail {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #324c5b;
  line-height: 22.1px;
}
p.price {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  align-items: center;
  color: #324c5b;
  display: block;
}
p.price-Detail {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 100%;
  align-items: center;
  color: #324c5b;
  display: block;
}
p.total {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  align-items: center;
  color: #324c5b;
  display: block;
  padding: 10px;
  margin-block-end: 0em;
}
p.float {
  font-family: Sukhumvit;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  text-align: center;
  color: #324c5b;
  display: block;
  padding: 10px;
  margin-block-end: 0em;
}
img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 0px 0px 20px 20px;
}
img.payment {
  /* max-width: 100px;
  max-height: 100px; */
  border-radius: 0px 0px 0px 0px;
}
/* hr {
  display: block;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  margin-left: 0.2em;
  margin-right: 0.2em;
  border-style: inset;
  border-width: 1px;
} */
.filter-blue {
  /* filter: sepia(100%) hue-rotate(190deg) saturate(500%); */

  width: 30px;
}
.btn {
  border: none;
  /* padding: 12px 16px; */
  font-size: 16px;
  cursor: pointer;
  background-color: #539aee;
  height: 40px;
  width: 100%;
}
.text-muted {
  font-size: 0.7rem;
}

/* .btn:before {
  content: url(/shopping_cart.svg);
  width: 20px;
  float: left;
  margin-right: 5px;
  margin-top: 2px;
  filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(100deg)
    brightness(100%) contrast(100%);
} */
</style>
