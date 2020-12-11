<template>
  <div class="container d-flex justify-content-center" style="margin-top: 100px;">
    <div class="align-self w-100">
      <div class="card text-center">
        <div class="card-header" style="background-color: #113566;">
          <img src="/qr-payment.jpg">
        </div>
        <div class="card-body" style="padding-top: 300px;">
          <div class="row">
            <div class="col-12">
              <p>
                ยอดชำระ (บาท)
              </p>
              <p style="font-size: 36px;">
                360.00
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p>
                บริษัท เอมิกา ไอที แอนด์ คอนซัลติ้ง จำกัด
              </p>
            </div>
          </div>
          <div class="w-100">
            <button class="btn btn-primary w-100" style="background-color: white;color: #539AEE;border: 1px solid #539AEE;filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));border-radius: 5px;">
              <div class="w-fit-content mx-auto">
                บันทึกภาพ QR
              </div>
            </button>
          </div>
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
