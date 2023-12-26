//Get receive package from other locations

import api from '@/src/lib/axios';
import { formDataToJson } from '@/src/util';
import { User_role } from '@prisma/client';

const getPackageStatistics = async (location_id: number, role: User_role) => {
	try {
		const response = await api.get('/api/manager/package', {
			params: {
				location_id,
				role,
			},
		});
		const data = response.data.data;
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
	const response = await api.post('/api/manager/account', data);
	if (!response) {
		//TODO: show error
	}
};

const deleteEmployeeAccount = async (email: string) => {
	const response = await api.delete('/api/manager/account', {
		params: {
			email,
		},
	});
	if (!response) {
		//TODO: show error
	}
};

const updateEmployeeAccount = async (e: any) => {
	e.preventDefault();
	const formData = formDataToJson(new FormData(e.target));
	const data = {
		email: formData.email,
		fullName: formData.fullName,
	};
	const response = await api.patch('/api/manager/account', data);
	if (!response) {
		//TODO: Show error
	}
};
