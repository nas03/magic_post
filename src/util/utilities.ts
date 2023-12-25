const RATE = 2;

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
export { calculator, getFormattedDate };
