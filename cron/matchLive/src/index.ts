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
import { KVNamespace } from '@cloudflare/workers-types'


export interface Env {
	API_URL: string;
	CRON_SECRET: string;
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
			console.log(match.link)
			if (matchData.status === 'LIVE') {
				// if(matchData.status==='LIVE' && await env.matchesKV.get(match.id.toString())!=='LIVE'){
				fetch(env.API_URL, {
					method: 'POST',
					body: JSON.stringify(matchData),
					headers: {
						secret: env.CRON_SECRET,
					}
				})
			}
			if (matchData.status === 'FINISHED') {
				// if(matchData.status==='FINISHED' && await env.matchesKV.get(match.id.toString())!=='FINISHED'){)
				fetch(env.API_URL, {
					method: 'POST',
					body: JSON.stringify(matchData),
					headers: {
						secret: env.CRON_SECRET,
					}
				})
			}
		})
	},
};
