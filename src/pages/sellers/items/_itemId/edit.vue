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
          <div class="upload-box files text-center mb-3" :class="{ 'upload-box-invalid': itemValidator.cover }" @click="selectCover()">
            <img src="~/assets/upload-cloud.svg">
            <p class="text-muted mb-1">
              {{ item.cover.description }}
            </p>
            <p class="text-muted sub-text">
              {{ item.cover.subDescription }}
            </p>
            <input ref="cover" type="file" class="form-control d-none" @change="coverImgHandler()">
          </div>
          <div class="input-group mb-3" :class="{ 'field-invalid': itemValidator.file }">
            <div id="file" class="w-100">
              ไฟล์สินค้า
            </div>
            <input
              ref="file"
              type="file"
              class="form-control p-0 d-none"
              aria-describedby="file"
              @change="uploadSecret()"
            >
            <div class="w-100" @click="selectFile()">
              <div class="float-left text-truncate col-8">
                {{ item.file.name }}
              </div>
              <div class="float-right">
                Choose File
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <button class="btn btn-primary w-100" @click="createItem()">
          <div class="w-fit-content mx-auto">
            ดำเนินการต่อ
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, functions } from '~/plugins/firebase'
export default {
  layout: 'view',
  middleware: ['auth', 'seller'],
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
        id: '',
        name: '',
        cost: 0,
        description: '',
        cover: {
          name: '',
          url: '',
          description: 'สามารถใส่รูปภาพได้สูงสุด 1 รูป',
          subDescription: 'สเกลภาพ 1:1 ขนาดไม่เกิน 2 เมกาไบต์',
          progress: 0
        },
        file: {
          name: '',
          url: '',
          progress: 0
        },
        tags: []
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/getUser']
    }
  },
  methods: {
    selectCover () {
      this.$refs.cover.click()
    },
    selectFile () {
      this.$refs.file.click()
    },
    coverImgHandler () {
      this.itemValidator.cover = false
      const cover = this.$refs.cover.files[0]
      if (cover.type !== 'image/jpeg' && cover.type !== 'image/png') {
        this.itemValidator.cover = true
        this.item.cover.description = 'กรุณาใช้ไฟล์นามสกุล jpg/jpeg หรือ png เท่านั้น'
      } else if (cover.size > 2097152) {
        this.itemValidator.cover = true
        this.item.cover.description = 'ขนาดรูปต้องไม่เกิน 2 เมกาไบต์'
      } else {
        this.item.cover.name = this.$refs.cover.files[0].name
        this.item.cover.description = this.item.cover.name
        // upload image
        const user = this.user
        if (!user.uid) {
          return this.$swal.fire(
            'เกิดข้อผิดพลาด',
            'กรุณาล็อคอินใหม่',
            'error'
          )
        }
        if (!this.item.id) {
          this.item.id = this.$uuid()
        }
        const coverName = 'cover-' + Math.floor(Date.now() / 1000)
        const storageRef = storage().ref()
        let storagePath = '/users'
        if (process.env.environment !== 'production') {
          storagePath = '/public/users'
        }
        const path = `${storagePath}/${user.uid}/items/${this.item.id}/covers/${coverName}`
        const uploadTask = storageRef.child(path).put(cover)
        uploadTask.on(storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          // upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.item.cover.progress = progress
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              // eslint-disable-next-line no-console
              console.log('Upload is paused')
              break
            case storage.TaskState.RUNNING: // or 'running'
              // eslint-disable-next-line no-console
              console.log('Upload is running')
              break
          }
        }, (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              this.$swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณาล็อคอินใหม่',
                'error'
              )
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            case 'storage/unknown':
              this.$swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณาลองใหม่',
                'error'
              )
              break
            default:
              this.$swal.fire(
                'เกิดข้อผิดพลาด',
                '',
                'error'
              )
              break
          }
        }, async () => {
          // success
          this.item.cover.url = await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            return downloadURL
          })
        })
      }
    },
    uploadSecret () {
      this.itemValidator.file = false
      const file = this.$refs.file.files[0]
      if (file.size > 20971520) {
        this.itemValidator.file = true
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          'ขนาดไฟล์ต้องไม่เกิน 20 เมกาไบต์',
          'error'
        )
      } else {
        // set image name
        this.item.file.name = file.name
        // upload image
        const user = this.user
        if (!user.uid) {
          return this.$swal.fire(
            'เกิดข้อผิดพลาด',
            'กรุณาล็อคอินใหม่',
            'error'
          )
        }
        if (!this.item.id) {
          this.item.id = this.$uuid()
        }
        const storageRef = storage().ref()
        let storagePath = '/users'
        if (process.env.environment !== 'production') {
          storagePath = '/public/users'
        }
        const path = `${storagePath}/${user.uid}/items/${this.item.id}/secrets/${this.item.file.name}`
        const uploadTask = storageRef.child(path).put(file)
        uploadTask.on(storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          // upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.item.file.progress = progress
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              break
            case storage.TaskState.RUNNING: // or 'running'
              break
          }
        }, (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              this.$swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณาล็อคอินใหม่',
                'error'
              )
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            case 'storage/unknown':
              this.$swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณาลองใหม่',
                'error'
              )
              break
            default:
              this.$swal.fire(
                'เกิดข้อผิดพลาด',
                '',
                'error'
              )
              break
          }
        }, async () => {
          // success
          this.item.file.url = await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            return downloadURL
          })
        })
      }
    },
    resetForm () {
      this.itemValidator.name = false
      this.itemValidator.cost = false
      this.itemValidator.description = false
      this.itemValidator.cover = false
      this.itemValidator.file = false
    },
    isItemValid () {
      this.resetForm()
      if (!this.item.name) {
        this.itemValidator.name = true
        this.$refs.name.focus()
      } else if (!this.item.cost) {
        this.itemValidator.cost = true
        this.$refs.cost.focus()
      } else if (!this.item.description) {
        this.itemValidator.description = true
        this.$refs.description.focus()
      } else if (!this.item.cover.name) {
        this.itemValidator.cover = true
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          'กรุณาอัพโหลดรูปสินค้า',
          'error'
        )
      } else if (!this.item.cover.url) {
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          `กำลังอัพโหลดรูป ${this.item.cover.progress}%`,
          'error'
        )
      } else if (!this.item.file.name) {
        this.itemValidator.file = true
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          'กรุณาอัพโหลดไฟล์สินค้า',
          'error'
        )
      } else if (!this.item.file.url) {
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          `กำลังอัพโหลดไฟล์ ${this.item.file.progress}%`,
          'error'
        )
      } else {
        return true
      }
      return false
    },
    async createItem () {
      if (!this.isItemValid()) {
        return
      }
      this.$store.dispatch('loading', true)
      const createItem = functions.httpsCallable('createItem')
      try {
        const data = {
          id: this.item.id,
          name: this.item.name,
          cost: parseFloat(this.item.cost),
          description: this.item.description,
          covers: this.item.cover.url,
          files: this.item.file.url,
          tags: this.item.tag,
          storeName: this.store.name
        }
        await createItem(data)
        this.$swal.fire(
          'บันทึกข้อมูลสำเร็จ',
          '',
          'success'
        )
        this.$store.dispatch('loading', false)
        return this.$router.push(this.$store.getters['seller/getDashboardURL'])
      } catch (error) {
        this.$swal.fire(
          'เกิดข้อผิดพลาด',
          error.message,
          'error'
        )
      }
      this.$store.dispatch('loading', false)
    }
  }
}
</script>

<style scoped>
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
