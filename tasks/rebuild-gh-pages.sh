#!/bin/bash

set -e

# Files that need to be checked out from master
masterDeps='Makefile tasks images styles scripts'

git checkout gh-pages

rm -rf $masterDeps
git checkout master $masterDeps

# Rebuild documentation and clean deps
make docs
cp -r docs/*.html .

# Make first page an index--why not?
cp 01-*.html index.html

rm -rf 'docs Makefile tasks'

# Commit and push
git add -A .
git commit -m "Rebuilds gh-pages for `git log master -1 | head -1`"
git push origin gh-pages

# Return to master
git checkout master

