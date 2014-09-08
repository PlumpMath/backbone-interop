// Demonstrate view portability with [Polymer](www.polymer-project.org) custom
// elements by binding an element in the DOM to the data in a Backbone model.
// This demo expects to have a `<my-figure>` element already loaded in the DOM:
//
//     <body>
//       <my-figure title="Pending"></my-figure>
//     </body>
//
window.addEventListener('polymer-ready', function () {

  // Create a prototype for the `<my-figure>` custom element
  var MyFigureProto = Object.create(HTMLDivElement.prototype);

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
      // Look, ma: no hands! Removing this element directly will drop it from
      // the jQuery collection used to update its attributes in our sample
      // app--no event bubbling needed!
      this.parentNode.removeChild(this);
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

  document.registerElement('my-figure', {
    prototype: MyFigureProto
  });

  // Apply `change` events from the model to any `<my-figure>` elements already
  // on the page
  model.on('change', function () {
    $('my-figure').attr(model.toJSON());
  });

  // Apply an initial state
  model.trigger('change');
});

