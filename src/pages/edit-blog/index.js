import { html } from 'lit';
import { Page as BlogPage } from '../blog/index.js'

export class Page extends BlogPage {

  async editBlog (event) {
    event.preventDefault();
    const { _id } = this.blog || {};
    const { target: form } = event;
    const title = form.title.value;
    const text = form.text.value;

    const url = this.blog ? `/blog/${_id}` : '/blog';
    const method = this.blog ? 'PUT' : 'POST';
    

    const result = await window.fetch(url, {
      method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        text
      })
    });
    

    // checks if http status code is 200
    if (result.status === 200) {
      const el = document.querySelector('small-router');
      this.blog = await result.json();
      el.changeUrl(`/view-blog/${this.blog._id}`);
    }
  }

  render () {
    const { title, username, text, createDate, updateDate, _id } = this.blog || {};

    return html`
      <form @submit="${this.editBlog}" id="form">
        <label for="title"> Title:<label>
        <input 
          id="title" 
          name="title" 
          type="text" 
          value="${this.blog?.title || ''}"><br>

          <label for="text"> Text:<label>
          <textarea id="text" name="text">${this.blog?.text || ''}
          </textarea>

          <br>
          <button>Save</button>
      </form>
    `;
  }
}

window.customElements.define('edit-blog-page', Page);