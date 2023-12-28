// Get receive package from other locations

import { formDataToJson, addSearchParams } from '@/src/util';
import { User_role } from '@prisma/client';

const getPackageStatistics = async (location_id: number, role: User_role) => {
	try {
		const searchParams = {
			location_id: location_id,
			role: role,
		};
		const url = addSearchParams(
			new URL('http://localhost:3000/api/manager/package'),
			searchParams
		);

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log('data', data);
		return data;
	} catch (error) {
		console.log('Error fetching manager package statistics');
		throw error;
	}
};

const createNewEmployeeAccount = async (e: any) => {
	e.preventDefault();
	const formData = formDataToJson(new FormData(e.target));
	const data = {
		fullName: formData.fullName,
		email: formData.email,
		password: formData.password,
		role: formData.role,
		location_id: formData.location_id,
	};

	try {
		const response = await fetch('http://localhost:3000/api/manager/account', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			// Handle error here
			console.error('Error creating employee account');
			return;
		}

		// Handle successful response here
		console.log('Employee account created successfully');
	} catch (error) {
		console.error('Error creating employee account', error);
	}
};

const deleteEmployeeAccount = async (email: string) => {
	try {
		const searchParams = {
			email: email,
		};
		const url = addSearchParams(
			new URL('http://localhost:3000/api/manager/account'),
			searchParams
		);
		const response = await fetch(url, {
			method: 'DELETE',
		});

		if (!response.ok) {
			// Handle error here
			console.error('Error deleting employee account');
			return;
		}

		// Handle successful response here
		console.log('Employee account deleted successfully');
	} catch (error) {
		console.error('Error deleting employee account', error);
	}
};

const updateEmployeeAccount = async (e: any) => {
	e.preventDefault();
	const formData = formDataToJson(new FormData(e.target));
	const data = {
		email: formData.email,
		fullName: formData.fullName,
	};

	try {
		const response = await fetch('http://localhost:3000/api/manager/account', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			// Handle error here
			console.error('Error updating employee account');
			return;
		}

		// Handle successful response here
		console.log('Employee account updated successfully');
	} catch (error) {
		console.error('Error updating employee account', error);
	}
};
