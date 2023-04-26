interface FetchedTeam {
  name: string,
  short_name: string,
  team_flag: string,
  team_id: number,
  slug: string,
}

type Status = "pre" | "live" | "post";

const getStatus = (status: Status) => {
  switch (status) {
    case "pre":
      return "OPEN"
    case "live":
      return "LIVE"
    case "post":
      return "FINISHED"
  }
}

export const getMatch = async (link: string) => {
  const response = await fetch(link);
  const data = await response.json() as any;

  const winner = data.winner_team !== '' ? teamNametoId(data.winner_team) : 0 as number;
  const fetchedMatch = {
    teams: data.score_strip.map((team: any) => {
      return {
        name: team.name as string,
        short_name: team.short_name as string,
        team_flag: team.team_flag as string,
        team_id: parseInt(team.team_id),
        slug: team.slug as string,
      }
    }) as FetchedTeam[],
    id: parseInt(data.match_id),
    startTime: data.datetime as number,
    endTime: data.endtime as number,
    inPlay: data.in_play as boolean,
    slug: data.topic_slug as string,
    winner: winner,
    status: getStatus(data.match_status) as ReturnType<typeof getStatus>,
  }
  return fetchedMatch;
}

const teamNametoId = (teamName: string) => {
  const dict = [
    { name: "Mumbai Indians", id: 593 },
    { name: "Royal Challengers Bangalore", id: 646 },
    { name: "Kolkata Knight Riders", id: 591 },
    { name: "Chennai Super Kings", id: 610 },
    { name: "Delhi Capitals", id: 612 },
    { name: "Rajasthan Royals", id: 629 },
    { name: "Sunrisers Hyderabad", id: 658 },
    { name: "Punjab Kings", id: 627 },
    { name: "Lucknow Super Giants", id: 123214 },
    { name: "Gujarat Titans", id: 123216 },
  ]
  return dict.find((team) => team.name === teamName)?.id as number;
}
export type getMatchType = Awaited<ReturnType<typeof getMatch>>;