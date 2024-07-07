<template>
  <div v-if="show" class="modal-overlay ">
    <div class="modal-container ">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-end">
          <button type="button" class="close text-secondary" @click="closeModal">×</button>
        </div>
        <h2 class="text-header w-100 d-flex align-items-center">{{ textHeader }}</h2>
        <div class="body-container">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    textHeader: string
    show: boolean
    maxWidth?: string
    borderRadius?: string
  }>(),
  {
    textHeader: '',
    show: false
  }
)

const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
};
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
  width: 50%;
  border-radius: v-bind(borderRadius);
  max-width: v-bind(maxWidth);
  padding: 20px;
}

.modal-content {
  position: relative;
  width: 100%;
}

.close {
  border: none;
  background: none;
  padding: 0px;
  font-size: 30px;
}

.text-header {
  color: #16274a;
  font-size: 30px;
  margin-bottom: 20px;
}

.text-header:after {
  content: '';
  flex-grow: 1;
  border-bottom: 3px solid #16274a;
  margin-left: 10px;
  margin-top: 4px;
}

@media (max-width: 575.98px) {
  .text-header {
    font-size: 18px;
  }

  .text-header:after {
    margin-top: 2px;
  }

  .modal-container {
    width: 90%;
  }
}
</style>
