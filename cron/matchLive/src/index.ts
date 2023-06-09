/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

import { getMatch } from './cricket';
import matches from './matches';

export interface Env {
	API_URL: string;

	matchesKV: KVNamespace
}


export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		const todayMatch = matches.filter(match => match.startTime.toDateString() === new Date().toDateString());
		todayMatch.forEach(async (match) => {
			const matchData = await getMatch(match.link)
			console.log(matchData)
			if (matchData.status === 'LIVE' && await env.matchesKV.get(match.id.toString()) !== 'LIVE') {
				await fetch(env.API_URL, {
					method: 'POST',
					body: JSON.stringify({ link: matchData.link }),
				})
				await env.matchesKV.put(match.id.toString(), 'LIVE')
			}
			if (matchData.status === 'FINISHED' && await env.matchesKV.get(match.id.toString()) !== 'FINISHED')
				await fetch(env.API_URL, {
					method: 'POST',
					body: JSON.stringify({ link: matchData.link }),
				})
			await env.matchesKV.put(match.id.toString(), 'FINISHED')
		})
	},
};
