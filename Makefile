all: docs server

server:
	python -mSimpleHTTPServer

gh-pages:
	bash tasks/rebuild-gh-pages.sh

docs: deps
	cp -r images docs
	cp -r bower_components docs
	cp -r styles docs
	cp -r scripts docs
	node tasks/docs.js

deps:
	bower install

.PHONY: docs

