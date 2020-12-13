<template>
  <div class="container d-flex justify-content-center">
    <div class="align-self w-100">
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-12" style="padding-top: 15px;text-align: right;">
          <b>แดชบอร์ดผู้ขาย</b>
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
      <div class="row" style="padding-top:10px;">
        <div class="col-12">
          <p class="text-muted">
            เมนูสำหรับผู้ขาย
          </p>
        </div>
      </div>
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-2">
          <p>icon</p>
        </div>
        <div class="col-10">
          <a href="#">
            <p style="color:#539AEE">
              สินค้าของฉัน
            </p>
          </a>
        </div>
        <div class="col-12">
          <hr class="mt-0">
        </div>
        <div class="col-2">
          <p>icon</p>
        </div>
        <div class="col-10">
          <a href="#">
            <p style="color:#539AEE">
              ถอนรายได้
            </p>
          </a>
        </div>
        <div class="col-12">
          <hr class="mt-0">
        </div>
        <div class="col-2">
          <p>icon</p>
        </div>
        <div class="col-10">
          <a href="#">
            <p style="color:#539AEE">
              สินค้าของฉัน
            </p>
          </a>
        </div>
        <div class="col-12">
          <hr class="mt-0">
        </div>
        <div class="col-2">
          <p>icon</p>
        </div>
        <div class="col-10">
          <a href="#">
            <p style="color:#539AEE">
              ประวัติการถอนรายได้
            </p>
          </a>
        </div>
        <div class="col-12">
          <hr class="mt-0">
        </div>
        <div class="col-2">
          <p>icon</p>
        </div>
        <div class="col-10">
          <a href="#">
            <p style="color:#539AEE">
              แก้ไขข้อมูลร้านค้า
            </p>
          </a>
        </div>
        <div class="col-12">
          <hr class="mt-0">
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
</style>
