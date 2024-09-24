export function generateISOFormattedDate(normalDate) {
	// Convert the date string to a JS Date Object
	const dateObject = new Date(normalDate);

	// Format the date as a string in ISO 8601 format
	const isoFormattedDate = dateObject.toISOString();

	return isoFormattedDate;
}