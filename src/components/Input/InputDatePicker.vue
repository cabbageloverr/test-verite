<template>
  <div class="form-group">
    <label class="text-label">
      {{ textFloat }}
      <span v-if="isRequired" class="text-danger">*</span>
    </label>
    <div class="d-flex gap-3">
      <select class="form-select rounded-0 mt-1 text-label " v-model="date.day">
        <option v-for="day in list.day" :key="day.value" :value="day">{{ day.text }}</option>
      </select>

      <select class="form-select rounded-0 mt-1 text-label" v-model="date.month" @change="updateMonth(date.month.days)">
        <option v-for="month in list.month" :key="month.value" :value="month">{{ month.text }} </option>

      </select>

      <select class="form-select rounded-0 mt-1 text-label" v-model="date.year" @change="updateYear()">
        <option v-for="year in list.year" :key="year.value" :value="year">{{ year.text }}</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import moment from 'moment'

const props = withDefaults(
  defineProps<{
    textFloat: string
    type: string
    value?: string | Number
    isRequired?: boolean
  }>(),
  {
    textFloat: '',
    placeholder: '',
    type: 'text'
  }
)

const date = ref({
  day: { value: 0, text: 'วัน' },
  month: { value: 0, text: 'เดือน', days: 0 },
  year: { value: 0, text: 'ปี' }
})

const dayDefault = [
  { value: 0, text: 'วัน' },
  { value: 1, text: '01' },
  { value: 2, text: '02' },
  { value: 3, text: '03' },
  { value: 4, text: '04' },
  { value: 5, text: '05' },
  { value: 6, text: '06' },
  { value: 7, text: '07' },
  { value: 8, text: '08' },
  { value: 9, text: '09' },
  { value: 10, text: '10' },
  { value: 11, text: '11' },
  { value: 12, text: '12' },
  { value: 13, text: '13' },
  { value: 14, text: '14' },
  { value: 15, text: '15' },
  { value: 16, text: '16' },
  { value: 17, text: '17' },
  { value: 18, text: '18' },
  { value: 19, text: '19' },
  { value: 20, text: '20' },
  { value: 21, text: '21' },
  { value: 22, text: '22' },
  { value: 23, text: '23' },
  { value: 24, text: '24' },
  { value: 25, text: '25' },
  { value: 26, text: '26' },
  { value: 27, text: '27' },
  { value: 28, text: '28' },
  { value: 29, text: '29' },
  { value: 30, text: '30' },
  { value: 31, text: '31' }]

const list = ref({
  day: [...dayDefault],
  month: [
    { value: 0, text: 'เดือน', days: 0 },
    { value: 1, text: 'january', days: 31 },
    { value: 2, text: 'february', days: 29 },
    { value: 3, text: 'march', days: 31 },
    { value: 4, text: 'april', days: 30 },
    { value: 5, text: 'may', days: 31 },
    { value: 6, text: 'june', days: 30 },
    { value: 7, text: 'july', days: 31 },
    { value: 8, text: 'august', days: 31 },
    { value: 9, text: 'september', days: 30 },
    { value: 10, text: 'october', days: 31 },
    { value: 11, text: 'november', days: 30 },
    { value: 12, text: 'december', days: 31 }
  ],
  year: [{ value: 0, text: 'ปี' }]
})

const updateMonth = (days: number) => {
  if (days === 29) {
    if (date.value.year.value % 4 === 0) {
      list.value.day = dayDefault.filter(x => x.value <= 29)
    }
    else
      list.value.day = dayDefault.filter(x => x.value <= 28)
  }

  else list.value.day = dayDefault.filter(x => x.value <= days)

  if (days < date.value.day.value)
    date.value.day = { value: 0, text: 'วัน' }

}

const updateYear = () => {
  updateMonth(date.value.month.days)
}

const dateFormat = ref()

const formatDate = () => {
  const { day, month, year } = date.value;
  dateFormat.value = moment(`${year.value}-${month.value}-${day.value}`).format(
    "YYYY-MM-DD"
  ) + "T00:00:00.000Z";
}

const emit = defineEmits<{
  (e: 'handleSelect', value: string): void
}>()


watch(date.value, () => {
  if (date.value.day.value > 0 && date.value.month.value > 0 && date.value.year.value > 0) {
    formatDate()
    emit('handleSelect', dateFormat.value);
  }

}, { deep: true })

onMounted(() => {
  let thisYear = parseInt(moment().format("YYYY"));
  for (let i = thisYear; i > thisYear - 100; i--) {
    list.value.year.push({ value: i, text: i.toString() })
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
</style>