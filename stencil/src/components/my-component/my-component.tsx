import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @Prop() first: string;
  @Prop() last: string;

  @Method()
  showPrompt(): any {
    alert('hi!');
  }

  render(): JSX.Element {
    return (
      <div>
        Hello, World! I'm {this.first} {this.last}
        <button onClick={this.showPrompt}>Klick mich!</button>
      </div>
    );
  }
}
