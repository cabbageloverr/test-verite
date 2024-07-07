<template>
    <div class="pagination-container">
      <table class="table mt-3 table-striped">
        <thead>
          <tr class="text-center">
            <th scope="col" class="bg-navy text-white font-weight">รายละเอียดที่อยู่</th>
            <th scope="col" class="bg-navy"></th>
          </tr>
        </thead>
        <tbody class="overflow-auto" >
          <tr v-for="(item, index) in paginatedItems" :key="index">
            <td class="text-navy">{{ item.text }}</td>
            <td>
              <div class="d-flex text-navy gap-2">
                <a>แก้ไข</a>
                <div>|</div>
                <a>ลบ</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="footer-pagination d-flex justify-content-between">
        <select class="form-select text-navy  rounded-0 w-auto" v-model="itemsPerPage">
          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }} / หน้า</option>
        </select>
        <nav aria-label="Page navigation example">
          <ul class="pagination m-0">
            <li class="page-item">
              <a class="page-link rounded-0" href="#" aria-label="Previous" @click.prevent="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in pages" :key="page" class="page-item">
              <a class="page-link" href="#" @click.prevent="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</a>
            </li>
            <li class="page-item">
              <a class="page-link rounded-0" href="#" aria-label="Next" @click.prevent="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, defineProps, defineEmits, watch } from 'vue';
  
  interface Item {
    id: number;
    text: string;
  }
  
  const props = defineProps<{
    totalItems: number;
    itemsPerPage?: number;
    modelValue: number;
    itemList: Item[];
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const currentPage = ref(props.modelValue);
  const itemsPerPage = ref(props.itemsPerPage ?? 10);
  
  const totalPages = computed(() => Math.ceil(props.totalItems / itemsPerPage.value));
  
  const pages = computed(() => {
    const pageCount = totalPages.value
    const current = currentPage.value
    const displayNum = 2;
    const range: (number | string)[] = []
  
    for (let i = Math.max(2, current - displayNum); i <= Math.min(pageCount - 1, current + displayNum); i++) {
      range.push(i)
    }
  
    if (current - displayNum > 1) {
      range.unshift('...')
    }
    else if (current + displayNum < pageCount - 1) {
      range.push('...')
    }
  
    range.unshift(1);
    if (pageCount > 1) {
      range.push(pageCount)
    }
  
    return range
  })
  
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value
    return props.itemList.slice(start, end)
  });
  
  const goToPage = (page: number | string) => {
    if (typeof page === 'string') return
    if (page < 1) page = 1;
    if (page > totalPages.value) page = totalPages.value;
    currentPage.value = page
    emit('update:modelValue', page)
  };

  watch(() => itemsPerPage.value, () => {
 currentPage.value = 1
});

  
  const perPageOptions = [props.itemsPerPage, 5, 10, 20, 50]
  </script>
  
  <style scoped>
  .bg-navy {
    background-color: #16274a;
  }
  
  .font-weight {
    font-weight: 500;
  }
  
  .pagination-text {
    padding-left: 1px;
  }
  
  .thead,
  tbody,
  tfoot,
  tr,
  td,
  th {
    border-style: hidden !important;
    border: none;
  }
  
  .table-striped > tbody > tr:nth-child(odd) > td,
  .table-striped > tbody > tr:nth-child(odd) > th {
    background-color: #f3f6fd;
  }
  
  .text-navy {
    color: #16274a !important;
  }
  
  .page-item .page-link.active {
    font-weight: bold;
    background-color: #16274a;
    border: none;
    color: white !important;
  }

  .page-link{
    color: #16274a  !important;

  }

  .max-h{
    height: 30px;
  }

  </style>
  