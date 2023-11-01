import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to,from)=>{

  const store = useAuthStore()
  await store.fetchUser();

  if(to.meta.auth && !store.isLoggedIn){
      return{
          name:'login',
          query:{
              redirect:to.fullPath
          }
      }
  } else if (to.meta.guest && store.isLoggedIn) {
    return { name: "evaluation" };
  } else if (to.meta.admin && !store.isAdminStaff) {
    return { name: "dashboard" };
  }

});

export default router
