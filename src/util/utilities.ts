const RATE = 2;
interface FormDataJson {
	[key: string]: string | Blob | string[] | undefined;
}
const calculator = (weight: number) => {
	return weight * RATE;
};
const getFormattedDate = (date) => {
	// Get individual components of the date
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const year = date.getFullYear();

	// Create the formatted date string
	const formattedDate = `${day}-${month}-${year}`;

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
