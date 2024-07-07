<template>
  <div>
    <ModalVue :show="true" textHeader="เข้าสู่ระบบ" maxWidth="500px">
      <form class="mt-3">
        <inputText
          textFloat="อีเมล"
          isRequired
          placeholder="อีเมล"
          type="text"
          v-model="form.email"
        ></inputText>

        <inputText
          class="mt-3"
          textFloat="รหัสผ่าน"
          isRequired
          placeholder="รหัสผ่าน"
          type="password"
          v-model="form.password"
        ></inputText>
        <span v-if="$v.password.$error || $v.email.$error" class="text-danger text-sm">อีเมลหรือรหัสผ่านไม่ถูกต้อง</span>
      </form>

      <a class="mt-3 link-opacity-100 text-navy d-flex justify-content-end text-sm" href="/forget-password">
        ลืมรหัสผ่าน?
      </a>

      <div class="modalFooter">
        <button type="button" class="btn btn-primary w-100 bt-next mt-4" @click="handleSubmit()">
          เข้าสู่ระบบ
        </button>

        <div class="text-muted text-sm text-center mt-1">
          ลูกค้าใหม่?

          <a class="ms-2 link-opacity-100 text-navy" href="/"> สมัครสมาชิก </a>
        </div>
      </div>
    </ModalVue>
  </div>
</template>
  
  <script lang="ts" setup>
import ModalVue from '@/components/ModalVue.vue'
import inputText from '@/components/Input/InputText.vue'
import { required,  helpers, email } from '@vuelidate/validators'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

const form = ref({
  email: '',
  password: '',
}) as any

const password = helpers.regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)

const rules = {
  form: {
    email: { required, email },
    password: {
      required,
      password,
    },
  }
}


const $v = useVuelidate(rules.form, form.value)

const router = useRouter()

async function handleSubmit() {
  const result = await $v.value.$validate()
  if(result){
    router.push('/my-profile')
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
  