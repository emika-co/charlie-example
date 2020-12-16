<template>
  <div class="container-fluid">
    <div class="row my-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">รายละเอียดบัญชี</label>
        <div class="card">
          <div class="card-body">
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.storeName }">
              <span id="storeName" class="input-group-text">ชื่อร้าน</span>
              <input ref="storeName" v-model="store.storeName" type="text" class="form-control ml-auto col-6" aria-describedby="storeName">
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
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.fullName }">
              <span id="fullName" class="input-group-text">ชื่อ-นามสกุล</span>
              <input ref="fullName" v-model="store.fullName" type="text" class="form-control ml-auto col-6" aria-describedby="fullName">
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.tel }">
              <span id="tel" class="input-group-text">เบอร์ติดต่อ</span>
              <input ref="tel" v-model="store.tel" type="text" class="form-control ml-auto col-6" aria-describedby="tel">
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.citizenId }">
              <span id="citizenId" class="input-group-text">เลขบัตรประชาชน</span>
              <input ref="citizenId" v-model="store.citizenId" type="text" class="form-control ml-auto col-6" aria-describedby="citizenId">
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.address.detail }">
              <span id="addressDetail" class="input-group-text">ที่อยู่</span>
              <input
                ref="addressDetail"
                v-model="store.address.detail"
                type="text"
                class="form-control ml-auto col-6"
                placeholder="ต้องระบุ"
                aria-describedby="addressDetail"
              >
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.address.subDistrict }">
              <span id="subDistrict" class="input-group-text">ตำบล/แขวง</span>
              <input
                ref="subDistrict"
                v-model="store.address.subDistrict"
                type="text"
                class="form-control ml-auto col-6"
                placeholder="ต้องระบุ"
                aria-describedby="subDistrict"
              >
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.address.district }">
              <span id="district" class="input-group-text">อำเภอ/เขต</span>
              <input
                ref="district"
                v-model="store.address.district"
                type="text"
                class="form-control ml-auto col-6"
                placeholder="ต้องระบุ"
                aria-describedby="district"
              >
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.address.province }">
              <span id="province" class="input-group-text">จังหวัด</span>
              <input
                ref="province"
                v-model="store.address.province"
                type="text"
                class="form-control ml-auto col-6"
                placeholder="ต้องระบุ"
                aria-describedby="province"
              >
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.address.postal }">
              <span id="postal" class="input-group-text">รหัสไปรษณีย์</span>
              <input
                ref="postal"
                v-model="store.address.postal"
                type="text"
                class="form-control ml-auto col-6"
                placeholder="ต้องระบุ"
                aria-describedby="postal"
              >
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
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.bankAccount.accountName }">
              <span id="accountName" class="input-group-text">ชื่อบัญชี</span>
              <input ref="accountName" v-model="store.bankAccount.accountName" type="text" class="form-control ml-auto col-6" aria-describedby="accountName">
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.bankAccount.accountNumber }">
              <span id="accountNumber" class="input-group-text">เลขบัญชี</span>
              <input ref="accountNumber" v-model="store.bankAccount.accountNumber" type="text" class="form-control ml-auto col-6" aria-describedby="accountNumber">
            </div>
            <div class="input-group mb-3" :class="{ 'field-invalid': storeValidator.bankAccount.bank }">
              <span id="bank" class="input-group-text">ธนาคาร</span>
              <select v-model="store.bankAccount.bank" class="form-select form-control ml-auto col-6" aria-describedby="bank" aria-label="bank">
                <option value="" selected>
                  กรุณาเลือกธนาคาร
                </option>
                <option v-for="(bank, index) in banks" :key="index" :value="bank.id">
                  {{ bank.bankName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-2 my-3">
      <button ref="submitBtn" class="btn btn-primary w-100" @click="submitRegister()">
        ดำเนินการต่อ
      </button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { firestore, functions } from '~/plugins/firebase'
export default {
  layout: 'view',
  middleware: ['auth', 'kyc'],
  data () {
    return {
      banks: [],
      store: {
        storeName: '',
        fullName: '',
        firstName: '',
        lastName: '',
        tel: '',
        citizenId: '',
        address: {
          detail: '',
          subDistrict: '',
          district: '',
          province: '',
          postal: ''
        },
        bankAccount: {
          accountName: '',
          accountNumber: '',
          bank: ''
        }
      },
      storeValidator: {
        storeName: false,
        fullName: false,
        firstName: false,
        lastName: false,
        tel: false,
        citizenId: false,
        address: {
          detail: false,
          subDistrict: false,
          district: false,
          province: false,
          postal: false
        },
        bankAccount: {
          accountName: false,
          accountNumber: false,
          bank: false
        }
      }
    }
  },
  computed: {
    fullName () {
      return this.store.fullName
    }
  },
  watch: {
    fullName (val) {
      const name = val.split(' ')
      if (name.length === 2 && name[1]) {
        this.store.firstName = name[0]
        this.store.lastName = name[1]
      } else {
        this.store.firstName = ''
        this.store.lastName = ''
      }
    }
  },
  created () {
    this.$store.dispatch('setPageTitle', 'สมัครเป็นผู้ขาย')
    this.getBankList()
  },
  methods: {
    async getBankList () {
      try {
        const bankRef = firestore.collection('banks')
        const snapshot = await bankRef.get()
        snapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          this.banks.push(data)
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    resetForm () {
      this.storeValidator.storeName = false
      this.storeValidator.fullName = false
      this.storeValidator.tel = false
      this.storeValidator.citizenId = false
      this.storeValidator.address.detail = false
      this.storeValidator.address.subDistrict = false
      this.storeValidator.address.district = false
      this.storeValidator.address.province = false
      this.storeValidator.address.postal = false
      this.storeValidator.bankAccount.accountName = false
      this.storeValidator.bankAccount.accountNumber = false
      this.storeValidator.bankAccount.bank = false
    },
    isStoreValid () {
      this.resetForm()
      if (!this.store.storeName) {
        this.storeValidator.storeName = true
        this.$refs.storeName.focus()
      } else if (!this.store.firstName || !this.store.lastName) {
        this.storeValidator.fullName = true
        this.$refs.fullName.focus()
      } else if (!this.store.tel) {
        this.storeValidator.tel = true
        this.$refs.tel.focus()
      } else if (!this.store.citizenId) {
        this.storeValidator.citizenId = true
        this.$refs.citizenId.focus()
      } else if (!this.store.address.detail) {
        this.storeValidator.address.detail = true
        this.$refs.addressDetail.focus()
      } else if (!this.store.address.subDistrict) {
        this.storeValidator.address.subDistrict = true
        this.$refs.subDistrict.focus()
      } else if (!this.store.address.district) {
        this.storeValidator.address.district = true
        this.$refs.district.focus()
      } else if (!this.store.address.province) {
        this.storeValidator.address.province = true
        this.$refs.province.focus()
      } else if (!this.store.address.postal) {
        this.storeValidator.address.postal = true
        this.$refs.postal.focus()
      } else if (!this.store.bankAccount.accountName) {
        this.storeValidator.bankAccount.accountName = true
        this.$refs.accountName.focus()
      } else if (!this.store.bankAccount.accountNumber) {
        this.storeValidator.bankAccount.accountNumber = true
        this.$refs.accountNumber.focus()
      } else if (!this.store.bankAccount.bank) {
        this.storeValidator.bankAccount.bank = true
      } else {
        return true
      }
      return false
    },
    submitRegister () {
      if (!this.isStoreValid()) {
        return
      }
      const createSellers = functions.httpsCallable('createSellers')
      createSellers(this.store)
        .then((result) => {
          const store = {
            id: result.data._id,
            name: this.store.storeName
          }
          this.$store.dispatch('seller/setStore', store)
          Swal.fire(
            'บันทึกข้อมูลสำเร็จ',
            '',
            'success'
          )
          this.$router.push(this.$store.getters['seller/getRedirectURL'])
        })
        .catch((error) => {
          Swal.fire(
            'เกิดข้อผิดพลาด',
            error.message,
            'error'
          )
        })
    }
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
