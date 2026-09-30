import DefaultTheme from 'vitepress/theme';
import DocMeta from './DocMeta.vue';
import './custom.css';
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { app.component('DocMeta', DocMeta); }
};
