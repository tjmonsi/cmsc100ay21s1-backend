import { html } from 'lit';
import '@tjmonsi/small-router/small-router.js';
import './components/web-header/index.js';
import { state } from './worker/index.js';

const el = document.querySelector('small-router');
el.addEventListener('route-change-error', function ({ detail }) {
  console.log('router error');
  console.log(detail);
});

if (el) {
  el.routes = {
    '/': {
      render: () => html`<home-page></home-page>`,
      preRender: () => import('./pages/home/index.js')
    },
    '/login': {
      render: () => html`<login-page></login-page>`,
      preRender: () => import('./pages/login/index.js')
    },
    '/logout': {
      render: () => html`<logout-page></logout-page>`,
      preRender: () => import('./pages/logout/index.js')
    },
    '/view-blog/:id': {
      render: () => html`<blog-page></blog-page>`,
      preRender: () => import('./pages/blog/index.js')
    },
    '/edit-blog/:id': {
      render: () => html`<edit-blog-page></edit-blog-page>`,
      preRender: [
        async ({ params }) => {
          const username = await state.get('username');
          if (!username) {
            throw new Error('You are not logged in');
          }
          const { id } = params;
          const result = await window.fetch(`/blog/${id}`);
          const { username: blogUsername } = await result.json();
          if (username !== blogUsername) {
            throw new Error('You are not the owner');
          }
        },
        () => import('./pages/edit-blog/index.js')
      ]
    }
  };
}
