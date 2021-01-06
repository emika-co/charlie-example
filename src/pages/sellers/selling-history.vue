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
          <b>ประวัติการขายสินค้า</b>
        </div>
      </div>
      <div class="row" style="padding-top:20px;">
        <div class="col-12">
          <p class="text-muted">
            รายการเดินบัญชี
          </p>
        </div>
      </div>
      <div class="row" style="padding: 10px;background-color: #FFFFFF;">
        <div class="col-8" style="padding-top:5px;">
          <p style="text-align: left;margin-top: 10px;">
            ชีทสรุปเคมี ม.4-6 รวมทุก....
          </p>
        </div>
        <div class="col-4" style="text-align: right;">
          <p style="color:#2DBA75;">
            +300.00 ฿
          </p>
          <p class="text-muted">
            12 พ.ย. - 14.31
          </p>
        </div>
        <div class="col-12">
          <hr class="mt-0">
        </div>
        <div class="col-8" style="padding-top:5px;">
          <p style="text-align: left;margin-top: 10px;">
            ถอน
          </p>
        </div>
        <div class="col-4" style="text-align: right;">
          <p style="color:#FF4133;">
            -3000.00 ฿
          </p>
          <p class="text-muted">
            12 พ.ย. - 14.31
          </p>
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
