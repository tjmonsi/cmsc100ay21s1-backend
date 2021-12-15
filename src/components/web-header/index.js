import { LitElement, html } from 'lit';
import { proxy } from 'comlink';
import { state } from '../../worker/index.js';

export class Component extends LitElement {
  static properties = {
    isLoggedIn: {
      type: Boolean
    }
  }

  constructor () {
    super();
    this._boundSetLoggedIn = this.setLoggedIn.bind(this) // this === Component
  }

  async connectedCallback () {
    super.connectedCallback();

    state.subscribe('username', 'setLoggedIn', proxy(this._boundSetLoggedIn));

    this.checkAuth();
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    state.unsubscribe('username', 'setLoggedIn');
  }

  setLoggedIn (value) {
    // "this" is equal to Component Class because we have bounded it
    this.isLoggedIn = !!value;
  }

  async checkAuth () {
    const result = await window.fetch('/auth/check-auth');
    if (result.status === 200) {
      const { username } = await result.json();
      await state.set('username', username);
    }
  }

  createRenderRoot () {
    return this;
  }

  render () {
    return html`
      <header class="header">
        <h1>
          <a href="/">My Blog</a>
        </h1>

        <nav>
          ${this.isLoggedIn
            ? html`
            <a href="/create-blog">Create Blog</a>
            <a href="/logout">Logout</a>
            `
            : html`<a href="/login">Login</a>`}
        </nav>
      </header>
    `
  }
}

window.customElements.define('web-header', Component);