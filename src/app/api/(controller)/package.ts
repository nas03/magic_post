import { Package } from './../../../util/type';
import prisma from '@/src/lib/prisma';
//Get all packages if id = 0 or specific package with id != 0
const getPackage = async (id: number) => {
	try {
		return id !== 0
			? await prisma.renamedpackage.findFirst({
					where: { package_id: { equals: id } },
			  })
			: await prisma.renamedpackage.findMany();
	} catch (error) {
		console.error('Error fetching package by id', error);
		throw error;
	}
};
//Get status of package with id
const getPackageStatus = async (id: number) => {
	try {
		return await prisma.status.findMany({
			where: { package_id: { equals: id } },
		});
	} catch (error) {
		console.error('Error fetching package status', error);
		throw error;
	}
};
//Create new package
const createNewPackage = async (...params: any) => {
	try {
		return await prisma.renamedpackage.create({
			data: {
				weight: params.weight,
				send_date: params.send_date,
				type: params.type,
				sender_name_location: params.sender_name_location,
				sender_phone_number: params.sender_phone_number,
				sender_id: params.sender_id,
				receiver_id: params.receiver_id,
				receiver_name_location: params.receiver_name_location,
				receiver_phone_number: params.receiver_phone_number,
			},
		});
	} catch (error) {
		console.log('Error create new package', error);
		return null;
	}
};
//Create a new transport request to a hub center
const createNewTransportingRequest = async (
	package_id: number,
	request_post_id: number,
	destination_post_id: number,
	request_date: Date
) => {
	try {
		return await prisma.post_history.create({
			data: {
				package_id: package_id,
				request_post_id: request_post_id,
				destination_post_id: destination_post_id,
				request_date: request_date,
			},
		});
	} catch (error) {
		console.log('Error create new package status', error);
	}
};
//Update the package success state
const updatePackageSuccess = async (package_id: number, success: boolean) => {
	try {
		return await prisma.renamedpackage.update({
			where: {
				package_id: package_id,
			},
			data: {
				success: success,
			},
		});
	} catch (error) {
		console.log('Error updating package success state', error);
		return null;
	}
};

export { getPackageStatus, getPackage, createNewTransportingRequest };
