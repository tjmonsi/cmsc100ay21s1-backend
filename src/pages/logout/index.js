import { LitElement, html } from 'lit';
import { state } from '../../worker/index.js';

export class LogoutPage extends LitElement {
  connectedCallback () {
    super.connectedCallback();

    this.logout();
  }

  async logout () {
    const csrf = await this.getCsrf();

    const result = await window.fetch('/auth/logout', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': csrf
      }
    });

    // checks if http status code is 200
    if (result.status === 200) {
      const { success } = await result.json();
      if (success) {
        await state.set('token');
        await state.set('username');
      }
    }
    const el = document.querySelector('small-router');
    el.changeUrl('/');
  }

  createRenderRoot () {
    return this;
  }

  async getCsrf () {
    const result = await window.fetch('/auth/get-csrf');
    const { token } = await result.json();
    return token;
  }

  render () {
    return html`
      Logging out...
    `;
  }
}

window.customElements.define('logout-page', LogoutPage);
