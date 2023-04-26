
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
		const todayMatch = matches.filter(match => match.startTime.toDateString() === new Date().toDateString());
		const fetchedMatch = await Promise.all(todayMatch.map(async (match) => await getMatch(match.link)))
		fetch(env.API_URL, {
			method: 'POST',
			body: JSON.stringify(fetchedMatch),
			headers: {
				secret: env.CRON_SECRET,
			}
		})
		console.log(JSON.stringify(fetchedMatch))
	},
}; 
