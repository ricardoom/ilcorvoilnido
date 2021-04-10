# A simple web site for Il Nido Seattle

A basic site that is not so basic.

## Change Log

### v0.0.8

* Fix layout mishap w/ extra copy / info in the hero space

### v0.0.7

* updated COVID-19 Protocols
* Added Resy link back to site
* removed commented out code
* update to the readme
* minor css changes

### v0.0.6

* Back in the game, reopening: update to hours
* removed link to Resy
* Schema updated

### v0.0.5

* Temporary closing message update

### v0.0.4

* minor copy updates and css update

### v0.0.3

* redesign in effect

  * Added in a photo grid
  * Implemented a draft approach to css [ cube ] way of doing things...
  * Added `browsersync` to gulp for easier development
  * Added new typography rules and styles
  * Refactored JS, CSS, HTML
  * Added COVID response
  * Using Cloudinary CDN for image delivery

### v0.0.2

* Removed the outline from the logo.

### v0.0.1

* Added some basic JS to switch styles based on URL

## Instructions on how to use the code in this repo

Make sure you have Node.js installed (10.16.3)
    * _Note:_ this project uses gulp 3.x. As a result this project should be pinned to this verison of Node

Clone the repo `git clone https://github.com/ricardoom/ilcorvoilnido`

Run `npm -i` to install gulp and few of the dependencies.

### Source code, Development and Building

Development:

1. In your terminal navigate to the src directory in root of the project
2. Enter the command `npm run gulp`
3. This sets opens up a dev window and starts BrowswerSync

### Making Changes

Create a branch and switch to it:

`git checkout -b my-new-branch`

Do your work, commit changes and create a new pull request, then merge to development

Push the development branch to the server and test,

Create a Release (mostly for historical reasons, and it seems like a best practice, so there's always versioned source of truth)

* Check out a new branch `v0.0.x`
* Update Readme file
  * Changelog
  * Update workflow
  * etc.

Push release to remote repo

Checkout local development branch and merge the release

Push development to remote

Checkout local master, and fetch and pull from remote

Merge the development branch into master

Tag the branch w/ the release number

* `git tag v0.0.x`

Push tagged release master up to remote

Push the tags to remote `git push --tags`

Pull tagged release into production via deploy script (needs authorization & ssh setup, contact admin)
