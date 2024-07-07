<template>
    <NavBar>
        <form class="row g-2">

            <div class="col-12 col-md-6">
                <InputText v-model="form.currentPassword" textFloat="รหัสผ่านปัจจุบัน" isRequired
                    placeholder="รหัสผ่านปัจจุบัน" type="password">
                </InputText>
                <span v-if="$v.currentPassword.$error" class="text-danger text-sm">รหัสผ่านไม่ถูกต้อง</span>
            </div>

            <div class="w-100 col-12 col-md-6 "></div>

            <div class="col-12 col-md-6">
                <InputText textFloat="รหัสผ่านใหม่" isRequired placeholder="นามรหัสผ่านใหม่สกุล" v-model="form.password"
                    type="password">
                </InputText>
                <span v-if="$v.password.$error" class="text-danger text-sm">รหัสผ่านจะต้องประกอบด้วยตัวอักษร a-z และ 1-9
                    ควรมีความยาวไม่ต่ำกว่า 6 ตัวอักษร</span>
            </div>

            <div class="col-12 col-md-6">
                <InputText textFloat="ยืนยันรหัสผ่าน" v-model="form.confirmPassword" isRequired
                    placeholder="ยืนยันรหัสผ่าน" type="password">
                </InputText>
                <span v-if="$v.confirmPassword.$error" class="text-danger text-sm">รหัสผ่านไม่ตรงกัน</span>
            </div>

        </form>

        <div class="d-flex justify-content-center">

            <button type="button" class="btn btn-primary bt-submit  px-4 mt-5" @click="submitPassword">
                บันทึก
            </button>
        </div>


    </NavBar>

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import NavBar from '@/components/NavBar.vue'
import InputText from '@/components/Input/InputText.vue';
import { required, helpers, minLength, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const testPassword = 'cartoon123'

const form = ref({
    currentPassword: '',
    password: '',
    confirmPassword: '',
}) as any

const password = helpers.regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)

const rules = {
    form: {
        currentPassword: { required, password, minLength: minLength(6), sameAs: sameAs(testPassword) },
        password: {
            required,
            minLength: minLength(6),

        },
        confirmPassword: {
            required,
            password,
            sameAs: sameAs(computed(() => form.value.password))
        },
    }
}


const $v = useVuelidate(rules.form, form.value)

async function submitPassword() {
    const result = await $v.value.$validate()

}

</script>

<style scoped>
.user-name {
    padding-right: 50px !important;
}

.text-header {
    color: #16274a;
    font-size: 30px;
}

.text-navy {
    color: #16274a;
}

.text-header:after {
    content: '';
    flex-grow: 1;
    border-bottom: 3px solid #16274a;
    margin-left: 10px;
    margin-top: 4px;
}

@media (max-width: 575.98px) {
    .user-name {
        padding: 0 !important;
    }
}


.bt-submit {
    background: #16274a;
    border: none;
    border-radius: 0;


}

.text-sm {
    font-size: 14px;
}
</style>