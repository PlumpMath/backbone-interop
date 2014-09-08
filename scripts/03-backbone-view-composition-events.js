// Demonstrate view composition once events are involved. In this example, the
// `<figure>` will now change with the underlying model. A new title? A new
// image? The view will update to match.

// A trivial view representing an `<img>` element
var ImageView = Backbone.View.extend({
  tagName: 'img',
  render: function () {
    this.el.setAttribute('src', this.model.get('image'));
    return this;
  }
});

// A not-quite-trivial view representing a `<figcaption>` element
var FigcaptionView = Backbone.View.extend({

  tagName: 'figcaption',

  // Re-render when the model changes
  //
  // **Danger**! This event handler isn't being cleaned up.
  initialize: function () {
    this.listenTo(this.model, 'change', this.onModelChange);
  },

  render: function () {
    this.$el.empty().text(this.model.get('title'))
    return this;
  },

  onModelChange: function () {
    alert('changed');
    this.render();
  }
});

// A parent view, now with a "close" link to demonstrate the dangers of
// unmanaged event handlers. When we close the view, the childrens' listeners
// are not automagically unbound!
var ComposedFigureView = Backbone.View.extend({

  tagName: 'figure',

  events: {
    'click .js-close': 'onCloseClick'
  },

  render: function () {
    var imageView = new ImageView({ model: this.model });
    var figcaptionView = new FigcaptionView({ model: this.model });

    // **Danger!** We'll lose any content that existed inside the view element
    this.$el.html('<a class="js-close" href="#">close</a>')
      .append(imageView.render().el)
      .append(figcaptionView.render().el);
    return this;
  },

  // **Danger!** close the parent; the `listenTo` on the child is not cleaned up!
  onCloseClick: function (e) {
    e.preventDefault();
    this.$el.remove();
  }
});

// Demonstration: create a `ComposedFigureView`, render it, and append it to
// the container
window.addEventListener('DOMContentLoaded', function () {
  var figure = new ComposedFigureView({ model: model });
  document.querySelector('.container').appendChild(figure.render().el);
});

