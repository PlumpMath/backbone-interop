// Demonstrate view composition and event dispatching using
// [React.js](http://facebook.github.io/react/) components as child views. In
// this example, views are immutable: if the model changes in the parent, the
// children will be completely recreated.

// A trivial React component representing an `<img>` element
var ImageView = React.createClass({
  render: function () {
    return React.DOM.img({ src: this.props.image });
  }
});

// A trivial React component representing an `<figcaption>` element
var FigcaptionView = React.createClass({
  render: function () {
    return React.DOM.figcaption(null, this.props.title);
  }
});

// A parent view, now building its children using our React components.
var ComposedFigureView = Backbone.View.extend({
  tagName: 'figure',

  events: {
    'click .js-close': 'onCloseClick'
  },

  // Re-render everything when the model changes. Sloppy, but ok for a demo.
  initialize: function () {
    this.listenTo(this.model, 'change', 'render', this);
  },

  render: function () {

    // Create container elements to render the React components into. React
    // doesn't currently support insertion; we'll work around it by providing
    // elements whose content can be safely wiped out.
    var imageEl = document.createElement('div'),
        figcaptionEl = document.createElement('div');

    // **Danger!** We'll lose any content that existed inside the view element
    this.$el.html('<a class="js-close" href="#">close</a>')
      .append(imageEl)
      .append(figcaptionEl);

    // Render components into the container elements
    React.renderComponent(ImageView(this.model.toJSON()), imageEl);
    React.renderComponent(FigcaptionView(this.model.toJSON()), figcaptionEl);

    return this;
  },

  // Close the view and clean up the "close" event handlers
  onCloseClick: function (e) {
    e.preventDefault();
    this.$el.remove();
    this.stopListening();
  }
});

window.addEventListener('DOMContentLoaded', function () {
  var figure = new ComposedFigureView({ model: model });
  document.querySelector('.container').appendChild(figure.render().el);
});

