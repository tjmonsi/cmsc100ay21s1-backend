import { html } from 'lit';
import '@tjmonsi/small-router/small-router.js';
import './components/web-header/index.js';

const el = document.querySelector('small-router');

el.addEventListener('route-change-error', function ({ detail }) {
  console.log('router error');
  console.log(detail);
});

if (el) {
  el.routes = {
    '/': {
      render: () => html`<home-page></home-page>`,
      preRender: async () => import('./pages/home/index.js')
    },
    '/view-blog/:blogId': {
      render: () => html`<blog-page></blog-page>`,
      preRender: async () => import('./pages/blog/index.js')
    },
    '/edit-blog/:blogId': {
      render: () => html`<edit-blog-page></edit-blog-page>`,
      preRender: [
        // checks if user is authenticated
        async () => {
          const result = await window.fetch('/auth/check-auth');
          if (result.status >= 400) {
            const { message } = await result.json();
            throw new Error(message);
          }
        },
        // loads the script to visualize the edit-blog-page component
        async () => import('./pages/edit-blog/index.js')
      ]
    },
    '/create-blog': {
      render: () => html`<edit-blog-page></edit-blog-page>`,
      preRender: [
        async () => {
          const result = await window.fetch('/auth/check-auth');
          if (result.status >= 400) {
            const { message } = await result.json();
            throw new Error(message);
          }
        },
        async () => import('./pages/edit-blog/index.js')
      ]
    },
    '/login': {
      render: () => html`<login-page></login-page>`,
      preRender: () => import('./pages/login/index.js')
    },
    '/logout': {
      render: () => html`<logout-page></logout-page>`,
      preRender: () => import('./pages/logout/index.js')
    }
  }
}