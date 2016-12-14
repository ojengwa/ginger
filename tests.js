const casper = require('casper').create();

const URL = "http://localhost:8080/"

casper
	.start(URL)
	.then(function () {
		this.echo('First Page: ' + this.getTitle())
	})
	.test.begin('Unit tests', function (test) {
		test.assert(true);

		test.done();
	})
	.run();