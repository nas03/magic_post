const RATE = 2;
interface FormDataJson {
	[key: string]: string | Blob | string[] | undefined;
}
const calculator = (weight: number) => {
	return weight * RATE;
};
const getFormattedDate = (date: Date) => {
	// Get individual components of the date
	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-based
	const year = date.getFullYear();

	// Create a new Date object with the components
	const formattedDate = new Date(year, month - 1, day);
	return formattedDate;
};
const formDataToJson = (formData: FormData): FormDataJson => {
	const jsonObject: FormDataJson = {};
	formData.forEach((value, key) => {
		if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
			if (!Array.isArray(jsonObject[key])) {
				jsonObject[key] = [jsonObject[key] as string];
			}
			(jsonObject[key] as string[]).push(value.toString());
		} else {
			jsonObject[key] = value.toString();
		}
	});
	return jsonObject;
};
const addSearchParams = (url: URL, searchParams: object) => {
	Object.keys(searchParams).forEach((key) =>
		url.searchParams.append(key, searchParams[key])
	);
	return url;
};
export { calculator, getFormattedDate, formDataToJson, addSearchParams };
