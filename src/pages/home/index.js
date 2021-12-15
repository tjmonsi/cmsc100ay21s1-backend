import { LitElement, html } from 'lit';

export class Page extends LitElement {
  static properties = {
    blogs: {
      type: Array
    }
  }

  constructor () {
    super();
    /** @type {*} */
    this.blogs = [];
  }

  connectedCallback () {
    super.connectedCallback();
    this.fetch()
  }

  async fetch () {
    const result = await window.fetch('/blog');

    // checks if http status code is 200
    if (result.status === 200) {
      this.blogs = await result.json();
    }
  } 

  createRenderRoot () {
    // this adds it to the main HTML DOM instead of the shadowDOM
    return this;
  }

  render () {
    return html`${
      this.blogs?.map(({ title, username, createDate, updateDate, _id }) => html`
        <div class="blog-item">
          <h2>
            <a href="/view-blog/${_id}">${title}</a>
          </h2>

          <p>
            ${username ? html`By ${username} <br>` : ''}
            Created Date: ${new Date(createDate)} <br>
            Updated Date: ${new Date(updateDate)} <br>
          </p>
        </div>
      `)
    }`
  }
}

window.customElements.define('home-page', Page);