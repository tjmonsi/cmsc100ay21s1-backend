import { LitElement, html } from 'lit';
import { state } from '../../worker/index.js';

export class Page extends LitElement {
  static properties = {
    blog: {
      type: Object
    },
    username: {
      type: String
    }
  }

  async connectedCallback () {
    super.connectedCallback();
    
    const el = document.querySelector('small-router');
    const { blogId } = el.paramObject;
    if (blogId) {
      this.fetch(blogId);
    }

    this.username = await state.get('username');
  }

  async fetch (id) {
    const result = await window.fetch(`/blog/${id}`);

    // checks if http status code is 200
    if (result.status === 200) {
      this.blog = await result.json();
    }
  } 

  createRenderRoot () {
    // this adds it to the main HTML DOM instead of the shadowDOM
    return this;
  }

  render () {
    const { title, username, text, createDate, updateDate, _id } = this.blog || {};

    return this.blog 
      ? html`
        <article class="blog-article">
          <h2>${title}</h2>

          <p>
            ${username ? html`By ${username} <br>` : ''}
            Created Date: ${new Date(createDate)} <br>
            Updated Date: ${new Date(updateDate)} <br>
            ${this.username === username 
              ? html`<a href="/edit-blog/${_id}">Edit</a>`
              : ''
            }
          </p>

          <p>
            ${text}
          </p>
        </article>
      `
      : 'Loading...';
  }
}

window.customElements.define('blog-page', Page);