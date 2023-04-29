/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getMatch } from "./cricket";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	API_SECRET: string;
}

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "HEAD, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
}

function handleOptions(request: Request) {
	console.log(request.headers.get("Origin"))
	if (request.headers.get("Origin") !== null &&
		request.headers.get("Access-Control-Request-Method") !== null &&
		request.headers.get("Access-Control-Request-Headers") !== null) {
		// Handle CORS pre-flight request.
		return new Response(null, {
			headers: corsHeaders
		})
	} else {
		// Handle standard OPTIONS request.
		return new Response(null, {
			headers: {
				"Allow": "GET, HEAD, POST, OPTIONS",
			}
		})
	}
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		let response
		const { link }: { link: string } = await request.json()
		// console.log(env.API_SECRET) 
		// console.log(request.headers.get('secret'))
		// if (request.headers.get('secret') !== env.API_SECRET) return new Response('Unauthorized', { status: 401 })
		console.log(1)
		if (request.method === "OPTIONS") {
			response = handleOptions(request)
		}
		else {
			response = new Response(JSON.stringify(await getMatch(link)), { status: 200 })
			response.headers.set("Access-Control-Allow-Origin", "*")
			response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		}
		return response
	},
};
