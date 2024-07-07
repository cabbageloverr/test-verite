<template>
  <div>
    <ModalVue :show="true" textHeader="ตั้งรหัสผ่านใหม่" maxWidth="500px">
      <form class="mt-3">
        <inputText class="mt-3" textFloat="รหัสผ่าน" isRequired placeholder="รหัสผ่าน" type="password"
          v-model="form.password"
          detail="*รหัสผ่านจะต้องประกอบไปด้วยตัวอักษร a-z และ 1-9 ควรมีความยาวไม่ต่ำกว่า 6 ตัวอักษร"></inputText>
        <span v-if="$v.password.$error" class="text-danger text-sm">รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9
          ควรมีความยาวไม่ต่ำกว่า 6 ตัวอักษร</span>

        <inputText class="mt-3" v-model="form.confirmPassword" textFloat="ยืนยันรหัสผ่าน" isRequired
          placeholder="ยืนยันรหัสผ่าน" type="password">
        </inputText>
        <span v-if="$v.confirmPassword.$error" class="text-danger text-sm">รหัสผ่านไม่ตรงกัน</span>
      </form>
      <div class="modalFooter">
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary bt-next mt-5 mb-4" @click="handleSubmit()">
            รีเซ็ต
          </button>
        </div>

      </div>
    </ModalVue>
  </div>
</template>

<script lang="ts" setup>
import ModalVue from '@/components/ModalVue.vue'
import inputText from '@/components/Input/InputText.vue'
import { required, helpers, minLength, sameAs } from '@vuelidate/validators'
import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

const form = ref({
  password: '',
  confirmPassword: '',
}) as any

const password = helpers.regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
const rules = {
  form: {
    password: { required, password, minLength: minLength(6) },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs(computed(() => form.value.password))
    },
  }
}

const $v = useVuelidate(rules.form, form.value)

const router = useRouter()

async function handleSubmit() {
  const result = await $v.value.$validate()
  if (result) {
    router.push('/login')
  }
}
</script>

<style scoped>
.text-navy {
  color: #16274a;
}

.text-sm {
  font-size: 14px;
}

.bt-next {
  background: #16274a;
  border: none;
  border-radius: 0;
  padding: 10px;
  width: 150px;
}
</style>