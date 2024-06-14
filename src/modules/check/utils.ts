type GetDate = (date?: string) => string;
export const getDate: GetDate = (date = "") => {
// Converts string into searchable date format query string
	let day, month, year;
	if (date !== "") {
		[day, month, year] = date.split("-");
	} else {
		const date = new Date();
		year = date.getFullYear();
		month = date.getMonth();
		day = date.getDay();
	}
	return `${year}-${month}-${day}`;
};
