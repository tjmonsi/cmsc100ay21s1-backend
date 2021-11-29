import { LitElement, html } from 'lit';
import { state } from '../../worker/index.js';

export class LoginPage extends LitElement {
  /**
   * @param {*} event
   */
  async login (event) {
    event.preventDefault();
    const { target: form } = event;
    const username = form.username.value;
    const password = form.password.value;
    const csrf = await this.getCsrf();

    const result = await window.fetch('/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': csrf
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    // checks if http status code is 200
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
    return this;
  }

  async getCsrf () {
    const result = await window.fetch('/auth/get-csrf');
    const { token } = await result.json();
    return token;
  }

  render () {
    return html`
      <form @submit="${this.login}" id="form">
        <label for="username">Username:</label>
        <input id="username" name="username" type="text"><br>

        <label for="password">Password</label>
        <input id="password" name="password" type="password"><br>

        <br>
        <button>Login</button>
      </form>
    `;
  }
}

window.customElements.define('login-page', LoginPage);
