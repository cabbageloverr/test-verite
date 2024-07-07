import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../modules/account/RegisterModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../modules/account/LoginModal.vue')
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('../modules/account/ForgetPasswordModal.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../modules/account/ResetPasswordModal.vue')
    },
    {
      path: '/my-profile',
      name: 'my-profile',
      component: () => import('../modules/porfile/ProfilePage.vue')
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('../modules/porfile/ChangePassword.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../modules/porfile/AddressView.vue')
    }
  ]
})

export default router
