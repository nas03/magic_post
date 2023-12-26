import api from '@/src/lib/axios';
import { Package, formDataToJson, getFormattedDate } from '@/src/util';

import { Package_status } from '@prisma/client';
const fetchAllTransshipmentLogs = async (location_id: number) => {
	try {
		const response = await api.get('/api/employee/transshipment-log', {
			params: {
				location_id,
			},
		});
		const data = response.data.data;
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

const fetchPackageWithId = async (package_id: number) => {
	try {
		const response = await api.get('/api/employee/package', {
			params: {
				package_id,
			},
		});
		const data = response.data.data;
		return data;
	} catch (error) {
		console.log('Error fetching package to UI', error);
		return null;
	}
};

const createNewPackage = async (e: any) => {
	e.preventDefault();
	const formData = formDataToJson(new FormData(e.target));
	try {
		const data = {
			sender: formData.sender,
			receiver: formData.receiver,
			sender_location: formData.sender_location,
			receiver_location: formData.receiver_location,
			sender_phone: formData.sender_phone,
			receiver_phone: formData.receiver_phone,
			type: formData.type,
			fee: formData.fee,
			received_location_id: formData.received_location_id,
			destination_location_id: formData.destination_location_id,
		};

		const response = await api.post('/api/employee/package', data);
		const resData = response.data;
		if (resData.status == 200) {
			//TODO: Show success state
		} else {
			//TODO: Show error state
		}
	} catch (error) {
		console.log('Error post creating new package');
		return;
	}
};
//Verify package from other location
const verifyPackageTransshipment = async (transhipment_id: number) => {
	try {
		const response = await api.patch('/api/employee/transshipment-log', {
			transhipment_id,
		});
		const resData = response.data;
		if (resData.status == 200) {
			//TODO: Show success state
		} else {
			//TODO: Show error state
		}
	} catch (error) {
		console.log('Error verifying package received UI', error);
		return;
	}
};
//fetch all transshipment log

//create new order to other location
const createNewTransshipmentOrder = async (e: any) => {
	e.preventDefault();
	const formData = formDataToJson(new FormData(e.target));
	const data = {
		request_timestamp: getFormattedDate(new Date()),
		request_location: formData.request_location,
		destination_location: formData.destination_location,
		location_id: formData.location_id,
		package_id: formData.package_id,
	};
	try {
		const response = await api.post(`/api/employee/transshipment-log`, data);
		const resData = response.data;
		if (resData.status == 200) {
			//TODO: Show success state
		} else {
			//TODO: Show error state
		}
	} catch (error) {
		console.log('Error creating new transhipment order UI');
		throw error;
	}
};
//
const verifyPackageShipment = async (
	shipment_id: number,
	package_status: Package_status
) => {
	try {
		const response = await api.patch('/api/employee/shipment-log', {
			shipment_id,
			package_status,
		});
		const resData = response.data;
		if (resData.status == 200) {
			//TODO: Show success state
		} else {
			//TODO: Show error state
		}
	} catch (error) {
		console.log('Error verifying package shipment');
		return;
	}
};

const getShipmentStatistics = async (location_id: number) => {
	const response = await api.get('/api/employee', {
		params: {
			location_id,
			role: 'BRANCH_OFFICER',
		},
	});
	const data = response.data.data;
	const receivedCount = data.receivedCount;
	const returnedCount = data.returnedCount;
	return {
		receivedCount,
		returnedCount,
	};
};
const getTransshipmentStatistics = async (location_id: number) => {
	const response = await api.get('/api/employee', {
		params: {
			location_id,
			role: 'HUB_OFFICER',
		},
	});
	const data = response.data.data;
	const receivedCount = data.receivedCount;
	const sentCount = data.sentCount;
	return {
		receivedCount,
		sentCount,
	};
};
