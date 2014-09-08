// A nearly-trivial view representing an HTML `<figure>`.
//
// For a simple element with no UI or model events, we just need a string
// template to inject into the DOM.
var FigureView = Backbone.View.extend({

  tagName: 'figure',

  template: _.template([
    '<img src="<%- image %>" />',
    '<figcaption><%- title %></figcaption>'
  ].join('')),

  // Replace the view element's innerHTML with the rendered template
  render: function () {
    var attrs = this.model.toJSON();
    this.el.innerHTML = this.template(attrs);
    return this;
  }
});

// Demonstration: create a `FigureView`, render it, and append it to the
// container
window.addEventListener('DOMContentLoaded', function () {
  var figure = new FigureView({ model: model });
  document.querySelector('.container').appendChild(figure.render().el);
});

