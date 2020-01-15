import request from 'supertest';

import app from './app';

describe('APP TEST', () => {
	it('returns 404 for random-url', async () => {
		await expect(request(app).get('/random-url'))
			.resolves.toHaveProperty('status', 404);
	});

	// TODO(hanggi) add test for app
});
