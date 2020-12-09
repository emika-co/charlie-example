<template>
  <div class="container-fluid">
    <div class="row my-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">รายละเอียดบัญชี</label>
        <div class="card">
          <div class="card-body">
            <div class="input-group mb-3">
              <span id="storeName" class="input-group-text">ชื่อร้าน</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="storeName">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">รายละเอียดส่วนตัว (เพื่อออกใบกำกับภาษี)</label>
        <div class="card">
          <div class="card-body">
            <div class="input-group mb-3">
              <span id="fullname" class="input-group-text">ชื่อ-นามสกุล</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="fullname">
            </div>
            <div class="input-group mb-3">
              <span id="tel" class="input-group-text">เบอร์ติดต่อ</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="tel">
            </div>
            <div class="input-group mb-3">
              <span id="citizenId" class="input-group-text">เลขบัตรประชาชน</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="citizenId">
            </div>
            <div class="input-group mb-3">
              <span id="addressDetail" class="input-group-text">ที่อยู่</span>
              <input type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="addressDetail">
            </div>
            <div class="input-group mb-3">
              <span id="subDistrict" class="input-group-text">ตำบล/แขวง</span>
              <input type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="subDistrict">
            </div>
            <div class="input-group mb-3">
              <span id="district" class="input-group-text">อำเภอ/เขต</span>
              <input type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="district">
            </div>
            <div class="input-group mb-3">
              <span id="province" class="input-group-text">จังหวัด</span>
              <input type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="province">
            </div>
            <div class="input-group mb-3">
              <span id="postal" class="input-group-text">รหัสไปรษณีย์</span>
              <input type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="postal">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">รายละเอียดบัญชี</label>
        <div class="card">
          <div class="card-body">
            <div class="input-group mb-3">
              <span id="accountName" class="input-group-text">ชื่อบัญชี</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="accountName">
            </div>
            <div class="input-group mb-3">
              <span id="accountNumber" class="input-group-text">เลขบัญชี</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="accountNumber">
            </div>
            <div class="input-group mb-3">
              <span id="bank" class="input-group-text">ธนาคาร</span>
              <input type="text" class="form-control ml-auto col-6" aria-describedby="bank">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-2 my-3">
      <button class="btn btn-primary w-100">
        ดำเนินการต่อ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'view',
  // middleware: ['auth'],
  created () {
    this.$store.dispatch('setPageTitle', 'สมัครเป็นผู้ขาย')
  }
}
</script>

<style scoped>
.card {
  border-left: none;
  border-right: none;
  border-radius: 0;
}
.card-body {
  padding: 0.75rem;
}
.input-group-text {
  background-color: #fff;
  border: none;
  font-weight: 300;
}
.form-control {
  border: none;
  border-radius: 0;
}
.input-group {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
