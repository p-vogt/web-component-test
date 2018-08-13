import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';

class Button extends PolymerElement {
  static get template() {
    return html`
      <!-- shadow DOM goes here -->
      <button class="button">[[text]]</button>
    `;
  }

  static get properties() {
    return {
      text: {
        type: String
      },
    };
  }

  constructor() {
    super();
  }
}

customElements.define('my-button', Button);
