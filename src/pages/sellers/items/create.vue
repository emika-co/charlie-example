<template>
  <div class="container-fluid">
    <div class="row my-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">รายละเอียดสินค้า</label>
        <div class="bg-white p-3">
          <div class="input-group mb-3" :class="{ 'field-invalid': itemValidator.name }">
            <div id="name" class="w-100">
              ชื่อสินค้า
            </div>
            <input
              ref="name"
              v-model="item.name"
              type="text"
              class="form-control p-0"
              aria-describedby="name"
              placeholder="ต้องระบุ"
            >
          </div>
          <div class="input-group mb-3" :class="{ 'field-invalid': itemValidator.cost }">
            <div id="cost" class="w-100">
              ราคา
            </div>
            <input
              ref="cost"
              v-model="item.cost"
              type="number"
              class="form-control p-0"
              aria-describedby="cost"
            >
            <div class="input-group-text">
              บาท
            </div>
          </div>
          <div class="input-group" :class="{ 'field-invalid': itemValidator.description }">
            <div id="description" class="w-100">
              รายละเอียด
            </div>
            <textarea
              ref="description"
              v-model="item.description"
              type="text"
              class="form-control p-0"
              aria-describedby="description"
              placeholder="พิมรายละเอียดที่นี่"
              cols="1"
              rows="5"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row my-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">อัพโหลดไฟล์</label>
        <div class="bg-white file-upload-wrapper p-3">
          <div class="mb-2">
            รูปสินค้า
          </div>
          <div class="upload-box files text-center mb-3" :class="{ 'upload-box-invalid': itemValidator.cover }" @click="uploadCover()">
            <img src="~/assets/upload-cloud.svg">
            <p class="text-muted mb-1">
              {{ item.cover.description }}
            </p>
            <p class="text-muted sub-text">
              {{ item.cover.subDescription }}
            </p>
            <input ref="cover" type="file" class="form-control d-none" @change="selectedCover()">
          </div>
          <div class="input-group mb-3" :class="{ 'field-invalid': itemValidator.file }">
            <div id="file" class="w-100">
              ไฟล์สินค้า
            </div>
            <input
              ref="file"
              type="file"
              class="form-control p-0"
              aria-describedby="file"
            >
            <div class="input-group-text">
              Choose File
            </div>
          </div>
        </div>
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
</template>

<script>
export default {
  layout: 'view',
  data () {
    return {
      itemValidator: {
        name: false,
        cost: false,
        description: false,
        cover: false,
        file: false
      },
      item: {
        name: '',
        cost: 0,
        description: '',
        cover: {
          content: '',
          description: 'สามารถใส่รูปภาพได้สูงสุด 1 รูป',
          subDescription: 'สเกลภาพ 1:1 ขนาดไม่เกิน 2 เมกาไบต์'
        },
        file: ''
      }
    }
  },
  methods: {
    uploadCover () {
      this.$refs.cover.click()
    },
    selectedCover () {
      this.itemValidator.cover = false
      const cover = this.$refs.cover.files[0]
      if (cover.type !== 'image/jpeg' && cover.type !== 'image/png') {
        this.itemValidator.cover = true
        this.item.cover.description = 'กรุณาใช้ไฟล์นามสกุล jpg/jpeg หรือ png เท่านั้น'
      } else if (cover.size > 2000000) {
        this.itemValidator.cover = true
        this.item.cover.description = 'ขนาดรูปต้องไม่เกิน 2 เมกาไบต์'
      } else {
        this.item.cover.description = this.$refs.cover.files[0].name
      }
    }
  }
}
</script>

<style scoped>
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
#add-to-cart {
  width: 95px;
  margin-left: -15px;
}
.upload-box {
  border: 1px dashed rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1.5rem;
  cursor: pointer;
}
.upload-box-invalid {
  border: 1px dashed rgba(255, 0, 0, 1);
  border-radius: 5px;
  padding: 1.5rem;
  cursor: pointer;
}
</style>
