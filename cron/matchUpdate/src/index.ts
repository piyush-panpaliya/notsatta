
export interface Env {
	API_URL: string;
	CRON_SECRET: string;
}
import { getMatch } from './cricket';
import matches from './matches';

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		console.log(new Date().toDateString())
		const today = new Date()
		today.setDate(today.getDate() + 1)
		const todayMatch = matches.filter(match => match.startTime.toDateString() === today.toDateString());
		const fetchedMatch = await Promise.all(todayMatch.map(async (match) => await getMatch(match.link)))
		console.log(todayMatch)
		console.log(env.API_URL)
		await fetch(env.API_URL, {
			method: 'POST',
			body: JSON.stringify(fetchedMatch.map(match => ({ id: match.id }))),
			headers: {
				secret: env.CRON_SECRET,
			}
		})
	},
}; 
