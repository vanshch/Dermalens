import { isTokenValid } from '../utils/auth';

// Add this to your router configuration
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !isTokenValid()) {
    return next('/');
  }

  next();
}); 