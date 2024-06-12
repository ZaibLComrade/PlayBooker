// Recieves "HH:MM" time and recieves tuple of number [hour, minute];

type GetTimeArr = (time: string) => [number, number];
export const getTimeArr: GetTimeArr = (time) => {
	const [hour, minute] = time.split(":").map((t) => parseInt(t));
	return [hour, minute];
};
