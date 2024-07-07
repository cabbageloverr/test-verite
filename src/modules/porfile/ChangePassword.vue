<template>
    <NavBar>
        <form class="row ">

            <div class="col-12 col-md-6">
                <InputText textFloat="รหัสผ่านปัจจุบัน" isRequired placeholder="รหัสผ่านปัจจุบัน" type="text">
                </InputText>

            </div>

            <div class="w-100 col-12 col-md-6 "></div>

            <div class="col-12 col-md-6">
                <InputText textFloat="รหัสผ่านใหม่" isRequired placeholder="นามรหัสผ่านใหม่สกุล" type="text">
                </InputText>
            </div>

            <div class="col-12 col-md-6">
                <InputText textFloat="ยืนยันรหัสผ่าน" isRequired placeholder="ยืนยันรหัสผ่าน" type="text">
                </InputText>
            </div>

        </form>

        <div class="d-flex justify-content-center">

            <button type="button" class="btn btn-primary bt-submit  px-4 mt-5">
                บันทึก
            </button>
        </div>


    </NavBar>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import NavBar from '@/components/NavBar.vue'
import InputText from '@/components/Input/InputText.vue';
import InputDatePicker from '@/components/Input/InputDatePicker.vue';

library.add(faUser, faLock, faAddressBook, faRightFromBracket);


const selectGender = [
    { text: 'ชาย', value: 'male' },
    { text: 'หญิง', value: 'female' }
]


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


.menu-text {
    color: #ebd650;
}

.bt-submit {
    background: #16274a;
    border: none;
    border-radius: 0;


}
</style>