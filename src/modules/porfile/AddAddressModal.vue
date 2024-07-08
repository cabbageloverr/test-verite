<template>
    <div>
        <ModalVue :show="show" textHeader="ที่อยู่จัดส่ง" @close="closeModal" borderRadius="3px">
            <form class="mt-3 row g-3 ">
                <div class="name col-6">
                    <inputText textFloat="ชื่อ" isRequired placeholder="ชื่อ" type="text" v-model="form.name">
                    </inputText>
                    <span v-if="$v.name.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
                </div>

                <div class="lastname col-6">
                    <inputText textFloat="นามสกุล" isRequired placeholder="นามสกุล" type="text" v-model="form.lastName">
                    </inputText>
                    <span v-if="$v.lastName.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
                </div>



                <div class="col-12">
                    <label class="form-label text-navy">รายละเอียดที่อยู่</label>
                    <textarea rows="4" class="form-control rounded-0 text-navy" maxlength="255" v-model="form.detail"
                        placeholder="รายละเอียดที่อยู่"></textarea>

                </div>

                <div class="form-group col-6  text-navy">
                    <label class="text-label">
                        จังหวัด
                        <span class="text-danger">*</span>
                    </label>

                    <select class="form-select rounded-0 text-label mt-1" v-model="form.province"
                        @change="handleSeclectProvince(form.province)">

                        <option value="">กรุณาเลือกจังหวัด</option>
                        <option v-for="province in provinceThailand" :key="province.id" :value="province.name_th">{{
                            province.name_th }}</option>
                    </select>
                    <span v-if="$v.province.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
                </div>

                <div class="form-group col-6  text-navy">
                    <label class="text-label">
                        อำเภอ
                        <span class="text-danger">*</span>
                    </label>

                    <select class="form-select rounded-0 text-label mt-1" v-model="form.district"
                        @change="handleSeclectDisTrict(form.district)">
                        <option value="">กรุณาเลือกอำเภอ</option>
                        <option v-for="district in districtList" :key="district.id" :value="district.name_th">{{
                            district.name_th }}</option>
                    </select>
                    <span v-if="$v.district.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
                </div>

                <div class="form-group col-6  text-navy">
                    <label class="text-label">
                        แขวง/ตำบล
                        <span class="text-danger">*</span>
                    </label>
                    <select class="form-select rounded-0 text-label mt-1" v-model="form.subDistrict"
                        @change="handleSeclectSubDistrict(form.subDistrict)">
                        <option value="">กรุณาเลือกตำบล</option>
                        <option v-for="subD in subDistrict" :key="subD.id" :value="subD.name_th">{{ subD.name_th }}
                        </option>
                    </select>
                    <span v-if="$v.subDistrict.$error" class="text-danger text-sm">กรุณากรอกข้อมูลให้ครบถ้วน</span>
                </div>

                <div class="col-6 post-num">
                    <inputText textFloat="รหัสไปรษณีย์" isRequired placeholder="รหัสไปรษณีย์" type="text"
                        v-model="form.postNum"></inputText>
                    <span v-if="$v.postNum.$error" class="text-danger text-sm">กรุณากรอกเลขรหัสไปรษณีย์</span>
                </div>
            </form>


            <div class="modalFooter d-flex justify-content-between mt-4">
                <button type="button" class="btn  text-navy bt-cancle " @click="closeModal()">
                    ย้อนกลับ
                </button>

                <button type="button" class="btn btn-primary  bt-next" @click="handleSubmit()">
                    บันทึก
                </button>
            </div>
        </ModalVue>
    </div>
</template>

<script lang="ts" setup>
import ModalVue from '@/components/ModalVue.vue'
import inputText from '@/components/Input/InputText.vue'
import { required, helpers } from '@vuelidate/validators'
import { onMounted, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import axios from 'axios'


interface Address {
    name: string
    lastName: string
    detail: string
    province: string
    district: string
    subDistrict: string
    postNum: string
}

const form = reactive<Address>({
    name: '',
    lastName: '',
    detail: '',
    province: '',
    district: '',
    subDistrict: '',
    postNum: '',
})

const number = helpers.regex(/^[0-9]{5}$/);

const rules = {
    form: {
        name: { required },
        lastName: { required },
        province: { required },
        district: { required },
        subDistrict: { required },
        postNum: { required, number },
    }
}


const $v = useVuelidate(rules.form, form)


const emit = defineEmits<{
    (e: 'handleSubmit', id: number, value: any): void
}>()


const idAddress = ref(0)

async function handleSubmit() {
    const result = await $v.value.$validate()

    if (result) {
        emit('handleSubmit', idAddress.value, form)
        closeModal()
    }
}


const show = ref(false)

function showModal(id: number, oldForm?: Address) {
    idAddress.value = id
    if (oldForm) {
        form.name = oldForm.name,
            form.lastName = oldForm.lastName,
            form.detail = oldForm.detail,
            form.province = oldForm.province,
            form.district = oldForm.district,
            form.subDistrict = oldForm.subDistrict,
            form.postNum = oldForm.postNum,
            districtList.value = provinceThailand.value.find((x: any) => x.name_th === oldForm.province)?.amphure
        subDistrict.value = districtList.value.find((x: any) => x.name_th === form.district)?.tambon


    }
    show.value = true;
}

function closeModal() {
    show.value = false
    resetForm()
}

function resetForm() {
    form.name = '',
        form.lastName = '',
        form.detail = '',
        form.province = '',
        form.district = '',
        form.subDistrict = '',
        form.postNum = '',
        $v.value.$reset();

}


interface Tambon {
    id: number,
    name_th: string,
}

interface Amphure {
    id: number,
    name_th: string,
    tambon: Tambon[]
}

interface Province {
    id: number,
    name_th: string,
    amphure: Amphure[]
}

const provinceThailand = ref<Province[]>([])

const districtList = ref<any>([])

const subDistrict = ref<any>()

function handleSeclectProvince(name: string) {
    districtList.value = provinceThailand.value.find(x => x.name_th === name)?.amphure
    form.district = ''
    form.subDistrict = ''
    form.postNum = ''

}

function handleSeclectDisTrict(name: string) {
    subDistrict.value = districtList.value.find((x: any) => x.name_th === name)?.tambon
    form.subDistrict = ''
    form.postNum = ''
}

function handleSeclectSubDistrict(name: string) {
    form.postNum = subDistrict.value.find((x: any) => x.name_th === name)?.zip_code

}


onMounted(() => {
    (() => {
        axios(
            "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
        )
            .then((response) => response.data)
            .then((result) => {
                provinceThailand.value = result
            })
    })()
},)




defineExpose({
    showModal,
})
</script>

<style scoped>
.text-navy {
    color: #16274a;
}

.text-sm {
    font-size: 14px;
}

.bt-cancle {
    background: #ffffff;
    border: #16274a solid 1px;
    border-radius: 0;

}

.bt-cancle:hover {
    background: #16274a;
    border: #16274a solid 1px;
    border-radius: 0;
    color: white;
}

.bt-next {
    background: #16274a;
    border: none;
    border-radius: 0;

}
</style>