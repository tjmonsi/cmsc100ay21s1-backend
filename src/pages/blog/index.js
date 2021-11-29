import { LitElement, html } from 'lit';
import { state } from '../../worker/index.js';

export class BlogPage extends LitElement {
  static properties = {
    blog: {
      type: Object
    },
    isLoggedIn: {
      type: Boolean
    }
  }

  async connectedCallback () {
    super.connectedCallback();
    
    const el = document.querySelector('small-router');
    const { id } = el.paramObject;
    if (id) {
      this.fetch(id);
    }
    this.isLoggedIn = !!(await state.get('username'));
  }

  /**
   * 
   * @param {*} id 
   */
  async fetch (id) {
    const result = await fetch(`/blog/${id}`);
    
    // checks if http status code is 200
    if (result.status === 200) {
      this.blog = await result.json();
    }
  }

  createRenderRoot () {
    return this;
  }

  render () {
    const { title, username, text, createDate, updateDate, _id } = this.blog || {};
    return this.blog ? html`
      <article class="blog-item">
        <h2>${title}</h2>
        <p>
          ${username ? html`By ${username} <br>` : ''}
          Created: ${new Date(createDate)} <br>
          Updated: ${new Date(updateDate)} <br>
          ${this.isLoggedIn ? html`<a href="/edit-blog/${_id}">Edit</a>` : ''}
        </p>
        <p>
          ${text}
        </p>
      </article>
    ` : '';
  }
}

window.customElements.define('blog-page', BlogPage);
