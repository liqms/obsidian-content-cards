// 按 秒 倒计时
function countdown(h, m, s) {
	const timeElement = document.getElementById("countdown");
	const hourElement = document.getElementById("hour");
	const minuteElement = document.getElementById("minute");
	const secondElement = document.getElementById("second");

	let totalSeconds = h * 3600 + m * 60 + s;

	const timer = setInterval(() => {
		totalSeconds--;

		if (totalSeconds < 0) {
			clearInterval(timer);
			hourElement.textContent = "00";
			minuteElement.textContent = "00";
			secondElement.textContent = "00";
			return;
		}

		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		hourElement.textContent = hours.toString().padStart(2, "0");
		minuteElement.textContent = minutes.toString().padStart(2, "0");
		secondElement.textContent = seconds.toString().padStart(2, "0");
	}, 1000);
	return timer;
}

