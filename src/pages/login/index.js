import { LitElement, html } from 'lit';
import { state } from '../../worker/index.js';

export class Page extends LitElement {
  async login (event) {
    event.preventDefault();

    const { target: form } = event;

    const username = form.username.value;
    const password = form.password.value;

    const result = await window.fetch('/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (result.status === 200) {
      const { success, token, username } = await result.json();
      if (success) {
        await state.set('token', token);
        await state.set('username', username);

        const el = document.querySelector('small-router');

        el.changeUrl('/');
      }

    }
  }

  createRenderRoot () {
    // this adds it to the main HTML DOM instead of the shadowDOM
    return this;
  }

  render () {
    return html`
      <form @submit="${this.login}">
        <label for="username">Username:</label>
        <input id="username" name="username" type="text"><br>

        <label for="password">Password</label>
        <input id="password" name="password" type="password"><br>

        <br>
        <button>Login</button>
      </form>
    `
  }
}

window.customElements.define('login-page', Page);