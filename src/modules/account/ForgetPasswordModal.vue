<template>
  <div>
    <ModalVue :show="true" textHeader="ลืมรหัสผ่าน" maxWidth="500px">
      <form class="mt-3">
        <inputText textFloat="อีเมล" isRequired placeholder="อีเมล" type="text" v-model="form.email"></inputText>
      </form>

      <span v-if="$v.email.$error" class="text-danger text-sm">อีเมลไม่ถูกต้อง</span>

      <div class="modalFooter ">
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary  bt-next mt-4 w-50" @click="handleSubmit()">
            รีเซ็ตรหัสผ่าน
          </button>
        </div>

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
import { required, email } from '@vuelidate/validators'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

const form = ref({
  email: '',
}) as any


const rules = {
  form: {
    email: { required, email },
  }
}

const $v = useVuelidate(rules.form, form.value)

const router = useRouter()

async function handleSubmit() {
  const result = await $v.value.$validate()
  if (result) {
    router.push('/reset-password')
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
  padding: 14px;
}
</style>