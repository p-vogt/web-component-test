import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';

class IconToggle extends PolymerElement {
  static get template() {
    return html`
       ${style}
      <!-- shadow DOM goes here -->
      <iron-icon icon="[[toggleIcon]]"></iron-icon>
      <div>[[pressed]]</div>
    `;
  }

  static get properties() {
    return {
      toggleIcon: {
        type: String
      },
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
    };
  }
  toggle() {
    console.log("pressed");
    this.pressed = !this.pressed;
  }
  constructor() {
    super();
    this.addEventListener('click', this.toggle.bind(this));
    console.log(this.pressed)
  }
}

const style = html`<style>
:host {
  display: inline-block;
}
iron-icon {
  fill: var(--icon-toggle-color, rgba(0,0,0,0));
  stroke: var(--icon-toggle-outline-color, currentcolor);
}
:host([pressed]) iron-icon {
  fill: var(--icon-toggle-pressed-color, currentcolor);
}
</style>
`

customElements.define('icon-toggle', IconToggle);
