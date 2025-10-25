import { createRouter, createWebHistory } from 'vue-router';
import SessionStart from '../views/SessionStart.vue';
import ThemeEditor from '../views/ThemeEditor.vue';
import ThemeEditorComplete from '../views/ThemeEditorComplete.vue';
import ThemeEditorNew from '../views/ThemeEditorNew.vue';

const routes = [
    { path: '/', component: SessionStart },
    { path: '/theme-editor', component: ThemeEditor },
    { path: '/theme-editor-complete', component: ThemeEditorComplete },
    { path: '/theme-editor-new', component: ThemeEditorNew }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
