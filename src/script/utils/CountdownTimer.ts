import { Events , Plugin} from "obsidian";
class CountdownTimer {
	private remainingTime: number;
	private intervalId: NodeJS.Timeout | undefined;

	constructor(remainingTime: number) {
		this.remainingTime = remainingTime;
	}

	/**
	 * 开始倒计时
	 */
	start(callback?: (remainingTime: number) => void): void {
		this.remainingTime--;

		if (this.intervalId) clearInterval(this.intervalId);

		this.intervalId = setInterval(() => {
			this.update();
			if (callback) {
				callback(this.remainingTime);
			}
		}, 1000);
	}

	/**
	 * 更新倒计时
	 */
	private update(): void {
		if (this.remainingTime == 0) {
			this.clearInterval();
		}
	}

	/**
	 * 清除间隔
	 */
	private clearInterval(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}
}
