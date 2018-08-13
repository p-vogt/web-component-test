// A <happy-thing> is a custom element that has a happy animation!
// The animation can be either "bounce" or "shake", and will default to
// "bounce" if you use an invalid , or no name
//
// Sample use: <happy-thing>🐶</happy-thing>


// First we need to do a little bit of work and 
// prepare the template for the element, so that the 
// polyfill can scope it correctly. If you only 
// want your stuff to work on browsers with native Shadow DOM
// (chrome & safari), you can skip this step!
let happyThingTemplate = document.createElement('template');
happyThingTemplate.innerHTML = getTemplateString();
if (window.ShadyCSS)
  window.ShadyCSS.prepareTemplate(happyThingTemplate, 'happy-thing');

// Define the element prototype.
class HappyThing extends HTMLElement {
  constructor() {
    super();
    
    // This is needed for the Shady DOM polyfill, since it's not
    // available on all browsers.
    if (window.ShadyCSS)
      window.ShadyCSS.styleElement(this);

    // Attach a shadow root to the element, so that the 
    // implementation is hidden in a 🎁.
    let shadowRoot = this.attachShadow({mode: 'open'});
    
    // Put the content of the template inside the shadow DOM.
    this.shadowRoot.appendChild(document.importNode(happyThingTemplate.content, true));
  }

  // This is how you would have a property that also reflect to an HTML attribute.
  // This means you can set it both in JS (someHappyThing.animation) and in
  // HTML (<happy-thing animation="..."></happy-thing>).
  get animation() { return this.style.animationName; }
  set animation(value) {
    // Default to "bounce" if I put in garbage.
    if (value === "bounce" || value === "shake") {
      this.style.animationName = value;
    } else {
      this.style.animationName = "bounce";
    }
  }

  // Which attributes we care about when they change. This makes sure
  // the internam property is synced when the HTML attribute changes.
  static get observedAttributes() { return ['animation']; }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue)
      this[attr] = newValue;
  }
}

// Define the custom element! This tells the browser that the <happy-thing> 
// element uses _this_ implementation.
window.customElements.define('happy-thing', HappyThing);

function getTemplateString() {
  return `
<style> 
:host {
display: inline-block;
cursor: pointer;
}

:host(:hover) .thing {
-webkit-animation-name: bounce;
animation-name: bounce;
-webkit-animation-duration: 1s;
animation-duration: 1s;
-webkit-animation-iteration-count: infinite;
animation-iteration-count: infinite;
}

@-webkit-keyframes bounce {
from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); }
10%, 20% { -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);}
30%, 50%, 70%, 90% { -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg); transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);}
40%, 60%, 80% { -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg); transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg);}
to { webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1);}
}
@keyframes bounce {
from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); }
10%, 20% { -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }
30%, 50%, 70%, 90% { -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg); transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg); }
40%, 60%, 80% { -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg); transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg); }
to { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); }
}
@keyframes shake {
20% { transform: rotate3d(0, 0, 1, 15deg); }
40% { transform: rotate3d(0, 0, 1, -10deg); }
60% { transform: rotate3d(0, 0, 1, 5deg); }
80% { transform: rotate3d(0, 0, 1, -5deg); }
to { transform: rotate3d(0, 0, 1, 0deg); }
}
</style> 
<div class="thing">
  <slot></slot>
</div>
`
}