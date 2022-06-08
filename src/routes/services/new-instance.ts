import axios from 'axios';

export async function post(req: any) {
	const data = await req.request.json();

	const item = 'Test ' + data.id;

	if (item) {
		return {
			status: 200,
			body: { item }
		};
	}

	return {
		status: 404
	};
}
