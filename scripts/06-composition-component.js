// Demonstrate view composition and portability by separating view logic into a
// [Polymer](www.polymer-project.org) custom element.

// Wait until the Polymer platform indicates readiness
window.addEventListener('polymer-ready', function () {

  // Create a prototype for the `<my-figure>` custom element
  var MyFigureProto = Object.create(HTMLElement.prototype);

  // Handle rendering
  MyFigureProto.createdCallback = function () {

    // Set up child elements
    var img = this.img = document.createElement('img');
    var figcaption = this.figcaption = document.createElement('figcaption');
    var close = document.createElement('a');

    // Set up the [Shadow DOM](https://github.com/Polymer/ShadowDOM)
    var shadow = this.createShadowRoot();

    // Configure the "close" link to fire a `close` event when clicked. We'll
    // use this in the application to remove the element
    close.setAttribute('href', '#');
    close.innerHTML = 'close';
    close.addEventListener('click', function (e) {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('close'));
    }.bind(this));

    // Add children to the Shadow DOM
    [close, img, figcaption].forEach(shadow.appendChild, shadow);
  };

  // Update child nodes when the element's attributes change
  MyFigureProto.attributeChangedCallback = function (key) {
    console.log('changed', key);
    switch (key) {
      case 'image': this.img.setAttribute('src', this.getAttribute('image')); break;
      case 'title': this.figcaption.innerHTML = this.getAttribute('title'); break;
    }
  };

  // Register the `<my-figure>` element
  document.registerElement('my-figure', {
    prototype: MyFigureProto
  });

  // ------------------
  //
  // ### Demonstration
  //
  // Create a `<my-figure>` and update it in response to changes in the model
  // state

  var container = document.querySelector('.container');

  // Create a new `<my-figure>`
  var figure = document.createElement('my-figure');

  // Callback: update the figure element
  var setAttributes = function () {
    figure.setAttribute('title', model.get('title'));
    figure.setAttribute('image', model.get('image'));
  };

  // Callback: remove the figure element in response to a `close` event
  figure.addEventListener('close', function () {
    model.off('change', setAttributes);
    container.removeChild(figure);
  });

  // Assign initial attributes
  setAttributes();

  // Update the element's attributes as the model state changes
  model.on('change', setAttributes);

  container.appendChild(figure);
});

