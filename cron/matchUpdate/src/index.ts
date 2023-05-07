
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
		const today = new Date(Date.now() + (5 * 60 * 60 * 1000))
		console.log(today.toLocaleDateString('en-US', { timeZone: "UTC" }))
		const todayMatch = matches.filter(match => match.startTime.toLocaleDateString('en-US', { timeZone: "UTC" }) === today.toLocaleDateString('en-US', { timeZone: "UTC" }));
		const fetchedMatch = await Promise.all(todayMatch.map(async (match) => await getMatch(match.link)))
		console.log("adding this match to cmatch", todayMatch)
		await fetch(env.API_URL, {
			method: 'POST',
			body: JSON.stringify(fetchedMatch.map(match => ({ id: match.id }))),
			headers: {
				secret: env.CRON_SECRET,
			}
		})
	},
}; 
