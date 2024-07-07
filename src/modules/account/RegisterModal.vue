<template>
  <div>
    <ModalVue :show="true" textHeader="ลงทะเบียน" maxWidth="500px">
      <form class="mt-3">
        <inputText textFloat="อีเมล" isRequired placeholder="อีเมล" type="text" v-model="form.email"></inputText>
        <span v-if="$v.email.$error" class="text-danger text-sm">กรุณากรอกอีเมล (เช่น email@example.com)</span>

        <inputText class="mt-3" textFloat="รหัสผ่าน" isRequired placeholder="รหัสผ่าน" type="password"
          v-model="form.password"
          detail="*รหัสผ่านจะต้องประกอบไปด้วยตัวอักษร a-z และ 1-9 ควรมีความยาวไม่ต่ำกว่า 6 ตัวอักษร"></inputText>
        <span v-if="$v.password.$error" class="text-danger text-sm">รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9
          ควรมีความยาวไม่ต่ำกว่า 6 ตัวอักษร</span>

        <inputText class="mt-3" v-model="form.confirmPassword" textFloat="ยืนยันรหัสผ่าน" isRequired
          placeholder="ยืนยันรหัสผ่าน" type="password">
        </inputText>
        <span v-if="$v.confirmPassword.$error" class="text-danger text-sm">รหัสผ่านไม่ตรงกัน</span>
  
        <inputDatePicker class="mt-3" textFloat="วันเกิด" type="text" :modelValue="form.birthday" 
        @handleSelect="handleDatePickerSelect"> </inputDatePicker>
        <span v-if="$v.birthday.$error" class="text-danger text-sm">กรุณาตรวจสอบความถูกต้องและลองใหม่อีกครั้ง</span>

        <div class="form-group radio-gender mt-3 d-flex gap-2 text-navy">
          <label>เพศ <span class="text-danger">*</span></label>
          <div class="form-check radio-checked" v-for="item in selectGender" :key="item.value">
            <input class="form-check-input" type="radio" v-model="form.gender" :value="item.value" />
            <label class="form-check-label"> {{ item.text }}</label>
          </div>
        </div>
        <span v-if="$v.gender.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>

        <div class="form-check mt-3 text-navy">
          <input class="form-check-input checkbox-checked rounded-0 border border-1" type="checkbox"
            v-model="form.isAccept" id="flexCheckDefault" />
          <label class="form-check-label" for="flexCheckDefault">
            ยอมรับข้อตกลงและเงื่อนไขการใช้งาน
            <a class="link-opacity-100 text-navy" href="#">เพิ่มเติม</a></label>
        </div>

      </form>

      <div class="modalFooter">
        <button :disabled="!form.isAccept" type="button" class="btn btn-primary w-100 bt-next mt-4"
          @click="handleSubmit()">
          ลงทะเบียน
        </button>
        <div class="text-muted text-sm text-center mt-1">
          เป็นสมาชิกแล้ว?
          <a class="ms-2 link-opacity-100 text-navy" href="/login"> เข้าสู่ระบบ </a>
        </div>


      </div>
    </ModalVue>
  </div>
</template>

<script lang="ts" setup>
import ModalVue from '@/components/ModalVue.vue'
import inputText from '@/components/Input/InputText.vue'
import inputDatePicker from '@/components/Input/InputDatePicker.vue'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

const selectGender = [
  { text: 'ชาย', value: 'male' },
  { text: 'หญิง', value: 'female' }
]

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  isAccept: false,
  birthday: '',
  gender: ''
}) as any

const password = helpers.regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)

const rules = {
  email: { required, email },
  password: {
    required,
    password,
    minLength: minLength(6)
  },
  confirmPassword: {
    required,
    minLength: minLength(6),
    sameAs: sameAs(computed(() => form.value.password))
  },
  isAccept: { required },
  birthday: { required },
  gender: { required },
}


const handleDatePickerSelect = (selectedDate: string) => {
  form.value.birthday = selectedDate;
}


const $v = useVuelidate(rules, form.value)

const router = useRouter()

async function handleSubmit() {
  const result = await $v.value.$validate()
  if(result){
    router.push('/login')
  }
}
</script>

<style scoped>
.text-navy {
  color: #16274a;
}

.bt-next {
  background: #16274a;
  border: none;
  border-radius: 0;
  padding: 14px;
}

.text-sm {
  font-size: 14px;
}

.form-check-input:focus {
  outline: 0;
  box-shadow: 0 0 0 0;
}

.radio-checked::v-deep .form-check-input:checked {
  background-color: #16274a;
}

.checkbox-checked:checked {
  background-color: #e9d27f;
  border-color: #e9d27f;
}
</style>
