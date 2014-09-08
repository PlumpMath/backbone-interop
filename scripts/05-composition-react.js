// Demonstrate view composition using *only* React components. In this example,
// all model/event/rendering logic has moved out of the views and up to the
// top-level application.
//
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

// An almost-trivial parent component.
var ComposedFigureView = React.createClass({
  render: function () {

    // Build the close link using an `onCloseLink` callback implemented and
    // provided by the parent. No logic here!
    var closeLink = React.DOM.a({
      onClick: this.props.onCloseClick,
      href: '#'
    }, 'close');

    return React.DOM.figure({}, [
      closeLink,
      ImageView(this.props),
      FigcaptionView(this.props)
    ]);
  }
});


// Demonstration: create a `ComposedFigureView`, render it, configure event
// handling, and append it to the `<body>`
window.addEventListener('DOMContentLoaded', function () {

  var container = document.querySelector('.container');

  // Render the `ComposedFigureView` component, passing in the model's
  // attributes and an `onCloseLink` callback as the initial properties
  var renderFigure = function () {
    var figure;
    var props = _.extend(model.toJSON(), {
      onCloseClick: function (e) {
        e.preventDefault();
        model.off('change', renderFigure);
        container.removeChild(renderedFigure.getDOMNode());
      }
    });
    figure = new ComposedFigureView(props);
    renderedFigure = React.renderComponent(figure, container);
  };

  // Render an initial figure
  renderFigure();

  // Re-render the figure every time the model changes
  model.on('change', renderFigure);
});

