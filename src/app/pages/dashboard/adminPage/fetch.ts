import { addSearchParams } from '@/src/util';
import { Location_type } from '@prisma/client';

export const fetchLocationData = async (location_type: Location_type) => {
	const url = new URL(
		addSearchParams(new URL('https://localhost:3000/api/admin/location'), {
			location_id: 0,
			location_type: location_type,
		})
	);
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
	});
	const { data } = await response.json();
	return data;
};
