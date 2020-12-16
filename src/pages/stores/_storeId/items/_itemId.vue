<template>
  <div class="container d-flex justify-content-center">
    <div class="align-self w-100">
      <div class="row my-2">
        <div class="col-8">
          <span>
            ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา โดยอาจารย์กบ พ่อทุกสถาบัน
          </span>
        </div>
        <div class="col-4 my-auto text-right">
          <button id="add-to-cart" class="btn btn-primary">
            <div class="w-fit-content mx-auto">
              <span class="material-icons mr-2 float-left">
                add_shopping_cart
              </span>
              360฿
            </div>
          </button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="w-100">
          <img class="w-100" src="/cat.jpg">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <b>
            ชีทสรุปเคมี ม.4-6 รวมทุกเนื้อหา โดยอาจารย์กบ พ่อทุกสถาบัน
          </b>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <p>
            #ชีทสรุปคุณภาพ Best.shortnote <br>
            ชีทสรุปอ่านง่าย เข้าใจไว อธิบายละเอียด <br>
            เจาะลึกทุกเนื้อหาตรงตามที่เรียน <br>
            เน้นตรงข้อสอบ สีสันสดชัด ช่วยกระตุ้นการจดจำ<br>
            และการ์ตูนน่ารักๆมากมายที่ <br>
            ช่วยดึงความสนใจให้รู้สึกอยากอ่าน อ่านเพลิน ไม่น่าเบื่อ 📚🥰🌟 <br>
            ✅ เนื้อหาสรุปอิงจากหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน <br>
            ✅ ใช้กระดาษอาร์ตมัน กันน้ำ 100% <br>
            ✅ ใส่สันเกลียวห่วงช่วยให้เปิดอ่านง่าย <br>
            #รีวิวเยอะกว่า 4,000 รีวิว <br>
            #อ่านแล้วผลการเรียนและเกรดดีขึ้นจริง <br>
            #สอบติดโรงเรียนในฝัน <br>
          </p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <div class="card w-100">
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <p><b>ราคา</b></p>
                </div>
                <div class="col-8 text-right">
                  <span>
                    <b>360</b> ฿
                  </span>
                  <p class="text-muted">
                    ราคาที่แสดงรวมภาษีมูลค่าเพิ่มแล้ว
                  </p>
                </div>
              </div>
              <hr class="mt-0">
              <div class="row">
                <div class="col-12">
                  <div class="float-left mr-2">
                    <img src="~/assets/check.svg" class="green-checker">
                  </div>
                  <div>
                    <p>รับรองคุณภาพโดย Charlie</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 mb-2">
                  <div class="float-left mr-2">
                    <img src="~/assets/check.svg" class="green-checker">
                  </div>
                  <div>
                    <p>อัพเดทเนื้อหาในอนาคต</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 mb-2">
                  <div class="float-left mr-2">
                    <img src="~/assets/check.svg" class="green-checker">
                  </div>
                  <div>
                    <p>บริการช่วยเหลือหลังการขาย 1 เดือน</p>
                  </div>
                </div>
              </div>
              <div class="w-100">
                <button class="btn btn-primary w-100">
                  <div class="w-fit-content mx-auto">
                    <span class="material-icons mr-2 float-left">
                      add_shopping_cart
                    </span>
                    ซื้อสินค้านี้
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <span class="material-icons mr-2 float-left">
                    shopping_cart
                  </span>
                  219 ขายแล้ว
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pb-3">
        <div class="col-12 text-center">
          <p class="mb-0">
            © สงวนลิขสิทธิ์ โดย, อาจารย์กบ
          </p>
          <a href="#">
            ติดต่อทีมงาน เพื่อขอความช่วยเหลือ
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['auth']
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
