const faker = require('faker');

casper.test.begin('Page content tests', 3, function suite(test) {

	casper.setUp = function () {
		this.data = {
			"method": faker.helpers.randomize(['ideal', 'creditcard', 'bank-transfer']),
			"amount": faker.finance.amount(0, 9999999, 0),
			"currency": faker.helpers.randomize(['USD', 'EUR', 'AUD', 'GBP']),
			"created": "Mon Mar 29 1993 11:33:00 GMT+0200 (CEST)",
			"status": faker.helpers.randomize(['denied', 'accepted']),
			"merchant": faker.company.bsNoun()
		}
	};

	casper.start('http://localhost:8080/')
		.then(function () {
			this.echo(this.data);
			this.echo('Check page: loaded');
			test.assertHttpStatus(200);
		})
		.then(function () {
			this.echo('Check if form section is hidden');
			test.assertNotVisible('.paymentSection');
		})
		.then(function () {
			this.echo('Toggle form');
			this.click('button#payment');
		})
		.then(function () {
			this.echo('Check if form is visible');
			test.assertNotVisible('.paymentSection');
		})
		.then(function () {
			this.fill('#paymentForm', this.data, true);
		})
		.then(function () {
			this.open(this.getCurrentUrl(), {
				method: 'post',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				data: this.data

			})
		})
		.run(function () {
			test.done();
		});

})