<template>
    <NavBar>
        <form class="row g-4">
            <div class="col-12 col-md-6">
                <InputText v-model="form.name" class="" textFloat="ชื่อ" isRequired placeholder="ชื่อ"
                    type="text"></InputText>
                    <span v-if="$v.name.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
            </div>

            <div class="col-12 col-md-6">
                <InputText v-model="form.lastName" class="" textFloat="นามสกุล" isRequired
                    placeholder="นามสกุล" type="text">
                </InputText>
                <span v-if="$v.lastName.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
            </div>

            <div class="col-12 col-md-6">
                <InputText v-model="form.email" class="" textFloat="อีเมล" isRequired placeholder="อีเมล"
                    type="text"></InputText>
                <span v-if="$v.email.$error" class="text-danger text-sm">กรุณากรอกอีเมล (เช่น email@example.com)</span>
            </div>

            <div class="col-12 col-md-6">
                <InputText v-model="form.phoneNum" class="" textFloat="เบอร์โทรศัพท์" isRequired
                    placeholder="เบอร์โทรศัพท์" type="text">
                </InputText>
                <span v-if="$v.phoneNum.$error" class="text-danger text-sm">กรุณากรอกตัวเลขเบอร์มือถือจำนวน 10 ตัว</span>
            </div>

            <div class="col-12 col-md-6">
                <InputDatePicker class="" isRequired textFloat="วันเกิด" type="text"
                    :modelValue="form.birthday" @handleSelect="handleDatePickerSelect"> </InputDatePicker>
                    <span v-if="$v.birthday.$error" class="text-danger text-sm">กรุณาตรวจสอบความถูกต้องและลองใหม่อีกครั้ง</span>
            </div>

            <div class="radio-gender text-navy col-12 col-md-6">

                <label>เพศ <span class="text-danger">*</span></label>
                <div class="d-flex mt-2">
                    <div class="form-check radio-checked" v-for="item in selectGender" :key="item.value">
                        <input class="form-check-input" v-model="form.gender" type="radio" :value="item.value" />
                        <label class=" me-2"> {{ item.text }}</label>
                    </div>
                </div>
                <span v-if="$v.gender.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
            </div>

        </form>

        <div class="d-flex justify-content-center mt-4">

            <button type="button" class="btn btn-primary bt-submit  px-4" @click="handleSubmit">
                บันทึก
            </button>
        </div>
        


    </NavBar>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue'
import InputText from '@/components/Input/InputText.vue';
import InputDatePicker from '@/components/Input/InputDatePicker.vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';


const form = ref({
    name: '',
    lastName: '',
    email: '',
    phoneNum: '',
    birthday: '',
    gender: ''
}) as any


const selectGender = [
    { text: 'ชาย', value: 'male' },
    { text: 'หญิง', value: 'female' }
]

const handleDatePickerSelect = (selectedDate: string) => {
    form.value.birthday = selectedDate;
}

const number = helpers.regex( /^[0-9]{10}$/);


const rules = {
    name: { required },
    lastName: { required },
    email: { required, email },
    phoneNum: {required, number},
    birthday: { required },
    gender: { required },
}



const $v = useVuelidate(rules, form.value)


async function handleSubmit() {
    const result = await $v.value.$validate()

}

</script>

<style scoped>
.text-navy {
    color: #16274a;
}


.form-check-input:focus {
    outline: 0;
    box-shadow: 0 0 0 0;
}

.radio-checked::v-deep .form-check-input:checked {
    background-color: #16274a;
}


.menu-text {
    color: #ebd650;
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