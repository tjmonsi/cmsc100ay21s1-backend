import { LitElement, html } from 'lit';
import { state } from '../../worker/index.js';

export class Page extends LitElement {
  connectedCallback () {
    super.connectedCallback();
    this.logout();
  }

  async logout () {
    const result = await window.fetch('/auth/logout');

    await state.set('token', null);
    await state.set('username', null);
    const el = document.querySelector('small-router');
    el.changeUrl('/');
  }
}

window.customElements.define('logout-page', Page);