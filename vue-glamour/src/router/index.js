import { createRouter, createWebHistory } from 'vue-router';
import SessionStart from '../views/SessionStart.vue';
import ThemeEditor from '../views/ThemeEditor.vue';

const routes = [
    { path: '/', component: SessionStart },
    { path: '/theme-editor', component: ThemeEditor }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
