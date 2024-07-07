<template>
  <div class="form-group">
    <label class="text-label">
      {{ textFloat }}
      <span v-if="isRequired" class="text-danger">*</span>
    </label>
    <input class="form-control rounded-0 mt-1" :type="type" :placeholder="placeholder" v-model="inputValue"
     />
    <span v-if="detail" class="text-desc">{{ detail }}</span>
  
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    textFloat: string
    placeholder: string
    type: string
    detail?: string
    modelValue?: string | Number
    isRequired?: boolean
  }>(),
  {
    textFloat: '',
    placeholder: '',
    type: 'text'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<style scoped>
.text-label {
  color: #16274a;
}

.text-desc {
  color: rgba(22, 39, 74, 0.4);
  font-size: 12px;
  font-weight: normal;
}

.form-control::placeholder {
  color: #a9a9a9;
  font-weight: 300;
}
</style>