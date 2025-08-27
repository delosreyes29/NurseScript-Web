import { createRouter, createWebHistory } from 'vue-router'

// Import all views
import NotLoggedIn from '@/components/NotLoggedIn.vue'
import LoggedIn from '@/components/LoggedIn.vue'
import UserPage from '@/components/UserPage.vue'
import Highscore from '@/components/Highscore.vue'
import AboutNS from '@/components/AboutNS.vue'
import AboutNSNoLog from '@/components/AboutNSNoLog.vue'
import SettingsPage from '@/components/SettingsPage.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue' // <-- added
import Customize from '@/components/Customize.vue'
import CustomizeNoLog from '@/components/CustomizeNoLog.vue'
import Results from '@/components/Results.vue'

const routes = [
  // Not logged in (home). Add alias so /notloggedin also works.
  {
    path: '/',
    name: 'NotLoggedIn',
    component: NotLoggedIn,
    alias: ['/notloggedin']
  },
  {
    path: '/loggedin',
    name: 'LoggedIn',
    component: LoggedIn
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/highscore',
    name: 'Highscore',
    component: Highscore
  },
  {
    path: '/aboutns',
    name: 'AboutNS',
    component: AboutNS
  },
  // About page for NOT-logged-in users
  {
    path: '/aboutnsnolog',
    name: 'AboutNSNoLog',
    component: AboutNSNoLog
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  // Registration page (so LoginForm's Register button can navigate here)
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegisterForm,
    alias: ['/registerform'] // optional alias if your button used a different path
  },
  {
    path: '/customize',
    name: 'Customize',
    component: Customize
  },
  // Customize page for NOT-logged-in users
  {
    path: '/customizenolog',
    name: 'CustomizeNoLog',
    component: CustomizeNoLog
  },
  // Results page (for post-test summary)
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  // Optional: catch-all to redirect unknown routes to home
  // { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
