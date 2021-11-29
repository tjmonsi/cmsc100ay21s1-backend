import { LitElement, html } from 'lit-element';
import { proxy } from 'comlink';
import { state } from '../../worker/index.js';

export class WebHeader extends LitElement {
  static properties = {
    isLoggedIn: {
      type: Boolean
    }
  }

  constructor () {
    super();
    this._boundSetLoggedIn = this.setLoggedIn.bind(this);
  }

  async connectedCallback () {
    super.connectedCallback();
    state.subscribe('username', 'setLoggedIn', proxy(this._boundSetLoggedIn));

    // add checker of auth given cookie
    try {
      const result = await window.fetch('/auth/get-csrf');
      const { username } = await result.json();
      await state.set('username', username);
    } catch(error) {
      console.error(error);
    }    
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    state.unsubscribe('username', 'setLoggedIn');
  }

  createRenderRoot () {
    return this;
  }

  setLoggedIn (value) {
    this.isLoggedIn = !!value;
  }

  render () {
    return html`
      <header class="header">
        <h1></a href="/">My Page</a></h1>

        <nav>
          ${this.isLoggedIn 
            ? html`
            <a href="/logout">Logout</a>
            `
            : html`
            <a href="/login">Login</a>
            `}   
        </nav>
      </header>
    `;
  }
}

window.customElements.define('web-header', WebHeader);
