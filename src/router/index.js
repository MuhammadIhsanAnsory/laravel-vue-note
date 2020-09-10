import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Contact from '../views/Contact'
import NoteCreate from '../views/notes/Create'
import NoteTable from '../views/notes/NoteTable'
import NoteShow from '../views/notes/Show'
import NoteEdit from '../views/notes/Edit'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/note/create',
    name: 'note.create',
    component: NoteCreate
  },
  {
    path: '/note',
    name: 'note.index',
    component: NoteTable
  },
  {
    path: '/note/:noteSlug',
    name: 'note.show',
    component: NoteShow
  },
  {
    path: '/note/:noteSlug/edit',
    name: 'note.edit',
    component: NoteEdit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router