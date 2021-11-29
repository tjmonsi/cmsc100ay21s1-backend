import { html } from 'lit';
import { BlogPage } from '../blog/index.js';

export class EditBlogPage extends BlogPage {
  /**
   * @param {*} event
   */
  async editBlog (event) {
    event.preventDefault();
    const { _id } = this.blog;
    const { target: form } = event;
    const title = form.title.value;
    const text = form.text.value;
    const csrf = await this.getCsrf();

    const result = await window.fetch(`/blog/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': csrf
      },
      body: JSON.stringify({
        title,
        text
      })
    });

    // checks if http status code is 200
    if (result.status === 200) {
      const el = document.querySelector('small-router');
      el.changeUrl(`/view-blog/${_id}`);
    }
  }

  async getCsrf () {
    const result = await window.fetch('/auth/get-csrf');
    const { token } = await result.json();
    return token;
  }

  createRenderRoot () {
    return this;
  }

  render () {
    return html`
      <form @submit="${this.editBlog}" id="form">

        <label for="title">Title:</label>
        <input id="title" name="title" type="text" value="${this.blog?.title || 
        ''}"><br>

        <label for="text">Password</label>
        <textarea id="text" name="text">${this.blog?.text || 
          ''}</textarea>

        <br>
        <button>Save</button>
      </form>
    `;
  }
}

window.customElements.define('edit-blog-page', EditBlogPage);
