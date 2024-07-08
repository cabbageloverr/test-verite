<template>
    <div v-if="show" class="modal-overlay ">
        <div class="modal-container rounded">
            <div class="modal-content">
                <div class="body-container p-3">
                    <p class="h5 text-center">ยืนยันการลบ{{ textDelete }}หรือไม่</p>
                    <div class="footer justify-content-center d-flex gap-3 mt-5">
                        <button type="button" @click="closeModal"
                            class="btn btn-secondary rounded-0 border-0">ยกเลิก</button>
                        <button type="button" class="bt-submit text-white btn btn-primary"
                            @click="conFirmDelete">ยืนยัน</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = withDefaults(
    defineProps<{
        textDelete: string
    }>(),
    {
        textDelete: '',
    }
)

const show = ref(false)


const emit = defineEmits(['deleteItem']);
function showModal() {
    show.value = true
}

function conFirmDelete() {
    emit('deleteItem', true);
    closeModal()
}

function closeModal() {
    show.value = false
}



defineExpose({
    showModal,
})
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-container {
    background: white;
    padding: 20px;
}

.modal-content {
    position: relative;
    width: 100%;
}

.bt-submit {
    background: #16274a;
    border: none;
    border-radius: 0;
}
</style>