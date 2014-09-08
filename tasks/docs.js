var fs = require('fs'),
    path = require('path'),
    _ = require(path.resolve(__dirname, '../bower_components/underscore/underscore.js'));

var contents = [
  {
    id: '01-backbone-view',
    title: 'Vanilla <code>Backbone.View</code>'
  },
  {
    id: '02-backbone-view-composition',
    title: '<code>Backbone.View</code> with composition'
  },
  {
    id: '03-backbone-view-composition-events',
    title: 'Backbone composition with <code>events</code>'
  },
  {
    id: '04-view-composition-react',
    title: '<code>Backbone.View</code> root with React.js Children'
  },
  {
    id: '05-composition-react',
    title: 'React.js Composition'
  },
  {
    id: '06-composition-component',
    title: 'Webcomponent (JavaScript)'
  },
  {
    id: '07-portability-component',
    title: 'Webcomponent (Zepto)',
    markup: '<my-figure title="Just a moment..."></my-figure>'
  }
];

var template = _.template(fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8'));

var contentsHtml = contents.map(function (entry) {
}).join('\n');;

contents.forEach(function (entry) {

  var dest = path.resolve(__dirname, '../docs/' + entry.id + '.html');

  var defaults = {
    contents: contents,
    markup: '',
    script: '../scripts/' + entry.id + '.js'
  };

  console.log('writing', dest);

  fs.writeFileSync(dest, template(_.extend(defaults, entry )));
});

