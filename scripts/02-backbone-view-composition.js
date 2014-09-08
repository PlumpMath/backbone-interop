// Demonstrate view composition. In this example, the contents of the string
// template are replaced by two child views each representing a single element.

// A trivial view representing an `<img>` element
var ImageView = Backbone.View.extend({
  tagName: 'img',
  render: function () {
    this.el.setAttribute('src', this.model.get('image'));
    return this;
  }
});

// A trivial view representing a `<figcaption>` element
var FigcaptionView = Backbone.View.extend({
  tagName: 'figcaption',
  render: function () {
    this.$el.empty().text(this.model.get('title'));
    return this;
  }
});

// A slightly less trivial view demonstrating how child elements might be
// composted in a parent view
var ComposedFigureView = Backbone.View.extend({

  tagName: 'figure',

  render: function () {

    // Construct some children
    var imageView = new ImageView({ model: this.model });
    var figcaptionView = new FigcaptionView({ model: this.model });

    // **Danger!** We'll lose any nodes that might have already existed inside
    // the view element. Safe for our trivial case; tricky for more complicated
    // views.
    this.$el.empty()
      .append(imageView.render().el)
      .append(figcaptionView.render().el);

    return this;
  }
});

// Demonstration: create a `ComposedFigureView`, render it, and append it to
// the container
window.addEventListener('DOMContentLoaded', function () {
  var figure = new ComposedFigureView({ model: model });
  document.querySelector('.container').appendChild(figure.render().el);
});

