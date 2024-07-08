<template>
    <NavBar>
        <div class="button-container d-flex justify-content-end">
            <button class="btn btn-primary bt-submit py-2 px-4 mt-2" @click="openModal()">สร้างที่อยู่ใหม่</button>
        </div>
        <div class="pagination-container">
            <PaginationWithTable :totalItems="addressList.length" :itemsPerPage="3" :modelValue="currentPage"
                :itemList="addressListMap" @deleteItem="deleteAddress" @editItem="openModal" />
        </div>
    </NavBar>

    <AddAddressModal ref="addressModal" @handleSubmit="updateSubmit"></AddAddressModal>


</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import PaginationWithTable from '@/components/PaginationWithTable.vue';
import AddAddressModal from './AddAddressModal.vue'

interface Address {
    detail: string;
    province: string;
    district: string;
    subDistrict: string;
    postNum: string;
}

const addressList = ref([
    { id: 0, detail: 'test1', province: 'ปราจีนบุรี', district: 'ปราจีนบุรี', subDistrict: 'หนองกี่', postNum: '2510' },
    { id: 1, detail: 'test2', province: 'ปราจีนบุรี', district: 'ปราจีนบุรี', subDistrict: 'หนองกี่', postNum: '2510' },
    { id: 2, detail: 'test3', province: 'ปราจีนบุรี', district: 'ปราจีนบุรี', subDistrict: 'หนองกี่', postNum: '2510' },
    { id: 3, detail: 'test4', province: 'ปราจีนบุรี', district: 'ปราจีนบุรี', subDistrict: 'หนองกี่', postNum: '2510' },
    { id: 4, detail: 'test5', province: 'ปราจีนบุรี', district: 'ปราจีนบุรี', subDistrict: 'หนองกี่', postNum: '2510' },

]);

const addressListMap = computed(() =>
    addressList.value.map(x => ({
        id: x.id,
        text: `${x.detail} ${x.province} ${x.district} ${x.subDistrict} ${x.postNum}`,
    }))
);

const currentPage = ref(1)


const addressModal = ref<InstanceType<typeof AddAddressModal>>(null!)

const updateSubmit = (id: number | undefined, form: Address) => {
    if (id !== undefined) {
        const index = addressList.value.findIndex(a => a.id === id);
        if (index !== -1) {
            addressList.value[index] = { id, ...form };
        }
        else {
            const newId = addressList.value.length ? addressList.value[addressList.value.length - 1].id + 1 : 0
            addressList.value.push({ id: newId, ...form })
        }
    }
}

const deleteAddress = (id: number) => {
    addressList.value = addressList.value.filter(address => address.id !== id);
}


const openModal = (id?: number) => {
    addressModal.value.showModal(id)
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

.menu-text {
    color: #ebd650;
}

.bt-submit {
    background: #16274a;
    border: none;
    border-radius: 0;
}
</style>