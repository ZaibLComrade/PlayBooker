// Recieves "HH:MM" time and recieves tuple of number [hour, minute];

type GetTimeArr = (time: string) => [number, number];
export const getTimeArr: GetTimeArr = (time) => {
	const [hour, minute] = time.split(":").map((t) => parseInt(t));
	return [hour, minute];
};

type GetPayableAmount = (
	startTime: string,
	endTime: string,
	pricePerHour: number
) => number;
export const getPayableAmount: GetPayableAmount = (startTime, endTime, pricePerHour) => {
	const [h1, m1] = getTimeArr(startTime);
	const [h2, m2] = getTimeArr(endTime);
	const t1 = h1 + m1 / 60;
	const t2 = h2 + m2 / 60;
	return (t2 - t1) * pricePerHour
};
