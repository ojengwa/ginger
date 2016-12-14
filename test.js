casper.test.begin('Page content tests', 3, function suite(test) {

	casper.setUp = function () {
		this.data = {
			"method": "ideal",
			"amount": 9936,
			"currency": "USD",
			"created": "Mon Mar 29 1993 11:33:00 GMT+0200 (CEST)",
			"status": "denied",
			"merchant": "Ginger"
		}
	};

	casper.start('http://localhost:8080/')
		.then(function () {
			this.echo('Check page: loaded');
			test.assertHttpStatus(200);
		})
		.then(function () {
			this.echo('Check if form section is hidden');
			test.assertNotVisible('.paymentSection');
		})
		.then(function () {
			this.echo('Toggle form');
			this.click('button #payment');

			test.assertVisible('.paymentSection');
		})
		.run(function () {
			test.done();
		});

})