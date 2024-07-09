<template>
  <div class="container pt-4 h-100vh">
    <div class="user-name d-flex justify-content-end align-items-center gap-2 text-navy">
      <font-awesome-icon icon="fa-solid fa-user" class="icon" />
      <div>Natthima Noinon</div>
    </div>

    <div class="text-Header pt-5">
      <h2 class="text-header w-100 d-flex align-items-center">บัญชื่อผู้ใช้</h2>
    </div>

    <div class="d-flex pt-3 row">
      <div class="nav-side col-12 col-sm-4">
        <div class="hr d-none d-sm-block"></div>
        <div class="d-flex justify-content-between align-items-center menu-text">
          <h5 class="p-3 m-0">เมนู</h5>
          <font-awesome-icon :icon="show ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'"
            class="icon d-sm-none d-block" data-bs-toggle="collapse" data-bs-target="#menuCollapse"
            aria-expanded="false" aria-controls="menuCollapse" @click="showMenu" />
        </div>

        <div class=" d-sm-none d-block mb-4">
          <div id="menuCollapse" class="collapse show">
            <div v-for="(menu, index) in menus" :key="index" @click="router.push({ path: menu.path })"
              class="d-flex align-items-center border-top gap-2 py-3 px-3 text-navy position-relative" :class="{
                'border-onclick': route.path === menu.path,
                'border-bottom': index === menus.length - 1
              }">
              <font-awesome-icon :icon="`fa-solid ${menu.icon}`" class="icon me-2 h-5" />
              <h5 class="m-0">{{ menu.name }}</h5>
            </div>
          </div>
        </div>

        <div class="d-none d-sm-block">
          <div v-for="(menu, index) in menus" :key="index" @click="router.push({ path: menu.path })"
            class="d-flex align-items-center border-top gap-2 py-3 px-3 text-navy position-relative" :class="{
              'border-onclick': route.path === menu.path,
              'border-bottom': index === menus.length - 1
            }">
            <font-awesome-icon :icon="`fa-solid ${menu.icon}`" class="icon me-2 h-5" />
            <h5 class="m-0">{{ menu.name }}</h5>
          </div>
        </div>
      </div>

      <div class="border-start col-12 col-sm-8">
        <div class="p-2">
          <h5 class="text-mini-header w-100 d-flex align-items-center">{{ menus.find(x => x.path === route.path)?.name
            }}</h5>
          <div class="pt-2">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faRightFromBracket, faUser, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { useRoute, useRouter } from 'vue-router';

library.add(faUser, faLock, faAddressBook, faRightFromBracket, faCaretDown, faCaretUp);

const route = useRoute()
const router = useRouter()

const show = ref(true)

function showMenu() {
  show.value = !show.value
}

const menus = ref([{
  name: 'บัญชีของฉัน', path: '/my-profile', icon: 'fa-user'
}, {
  name: 'เปลี่ยนรหัสผ่าน', path: '/change-password', icon: 'fa-lock'
}, {
  name: 'ที่อยู่จัดส่ง', path: '/address', icon: 'fa-address-book'
},
{
  name: 'ออกจากระบบ', path: '/login', icon: 'fa-right-from-bracket'
}])



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

.border-onclick::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: #16274a;
}



.text-header:after {
  content: '';
  flex-grow: 1;
  border-bottom: 3px solid #16274a;
  margin-left: 10px;
  margin-top: 4px;
}

.text-mini-header {
  color: #16274a;

}

.text-mini-header:after {
  content: '';
  flex-grow: 1;
  border-bottom: 3px solid #16274a;
  margin-left: 10px;
  margin-top: 2px;
}

.h-100vh {
  height: 100vh;
}

.hr {
  border-bottom: solid 1px #dee2e6;
}

@media (max-width: 575.98px) {
  .user-name {
    padding: 0 !important;
  }
}

@media (max-width: 575.98px) {

  .text-header,
  .text-mini-headerมฃ,
  .menu-text,
  .h-5,
  h5 {
    font-size: 18px !important;
  }

  .text-header:after {
    margin-top: 2px;
  }

}


.menu-text {
  color: #ebd650;
}
</style>