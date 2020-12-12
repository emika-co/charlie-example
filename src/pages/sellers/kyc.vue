<template>
  <div class="container-fluid">
    <div class="row my-2">
      <div class="col-12 mx-0 px-0">
        <label class="my-1 mx-3 text-muted">รายละเอียดบัญชี</label>
        <div class="card">
          <div class="card-body">
            <div class="input-group mb-3">
              <span id="storeName" class="input-group-text">ชื่อร้าน</span>
              <input v-model="store.storeName" type="text" class="form-control ml-auto col-6" aria-describedby="storeName">
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
              <span id="fullName" class="input-group-text">ชื่อ-นามสกุล</span>
              <input v-model="store.fullName" type="text" class="form-control ml-auto col-6" aria-describedby="fullName">
            </div>
            <div class="input-group mb-3">
              <span id="tel" class="input-group-text">เบอร์ติดต่อ</span>
              <input v-model="store.tel" type="text" class="form-control ml-auto col-6" aria-describedby="tel">
            </div>
            <div class="input-group mb-3">
              <span id="citizenId" class="input-group-text">เลขบัตรประชาชน</span>
              <input v-model="store.citizenId" type="text" class="form-control ml-auto col-6" aria-describedby="citizenId">
            </div>
            <div class="input-group mb-3">
              <span id="addressDetail" class="input-group-text">ที่อยู่</span>
              <input v-model="store.address.detail" type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="addressDetail">
            </div>
            <div class="input-group mb-3">
              <span id="subDistrict" class="input-group-text">ตำบล/แขวง</span>
              <input v-model="store.address.subDistrict" type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="subDistrict">
            </div>
            <div class="input-group mb-3">
              <span id="district" class="input-group-text">อำเภอ/เขต</span>
              <input v-model="store.address.district" type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="district">
            </div>
            <div class="input-group mb-3">
              <span id="province" class="input-group-text">จังหวัด</span>
              <input v-model="store.address.province" type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="province">
            </div>
            <div class="input-group mb-3">
              <span id="postal" class="input-group-text">รหัสไปรษณีย์</span>
              <input v-model="store.address.postal" type="text" class="form-control ml-auto col-6" placeholder="ต้องระบุ" aria-describedby="postal">
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
              <input v-model="store.bankAccount.accountName" type="text" class="form-control ml-auto col-6" aria-describedby="accountName">
            </div>
            <div class="input-group mb-3">
              <span id="accountNumber" class="input-group-text">เลขบัญชี</span>
              <input v-model="store.bankAccount.accountNumber" type="text" class="form-control ml-auto col-6" aria-describedby="accountNumber">
            </div>
            <div class="input-group mb-3">
              <span id="bank" class="input-group-text">ธนาคาร</span>
              <select v-model="store.bankAccount.bank" class="form-select form-control ml-auto col-6" aria-describedby="bank" aria-label="bank">
                <option selected>
                  กรุณาเลือกธนาคาร
                </option>
                <option v-for="(bank, index) in banks" :key="index" :value="bank.bankTag">
                  {{ bank.bankName }}
                </option>
              </select>
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
import { firestore } from '~/plugins/firebase'
export default {
  layout: 'view',
  // middleware: ['auth', 'kyc'],
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
          this.banks.push(doc.data())
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    register () {
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
