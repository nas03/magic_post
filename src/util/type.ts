export interface Status {
	status_id: number;
	package_id: number;
	post_id: number;
	location: string;
	received_date: string;
	transported_date: string;
	success: boolean;
}

export interface Package {
	package_id: number;
	weight: number;
	send_date: string;
	type: string;
	sender_name_location: string;
	sender_phone_number: string;
	sender_id: number;
	receiver_name_location: string;
	receiver_id: number;
	receiver_phone_number: string;
}

export interface User {
	uuid: string;
	email: string;
	full_name: string;
	password: string;
	post_id: number;
	role: string;
}
export interface Post {
	post_id: number;
	location: string;
	type: string;
}
