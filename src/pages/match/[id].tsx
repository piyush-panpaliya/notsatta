import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { api } from '~/utils/api'
import { Team } from '@prisma/client'

export const TeamDiv = ({team,matchId}:{team:Team,matchId:string}) => {
  const {data,mutateAsync}=api.match.vote.putVote.useMutation()
  return (
    <div className='flex flex-col items-center gap-4'> 
      <img src={team.flag} className='w-12 h-12'/>
      <button onClick={()=>mutateAsync({inpMatchId:matchId,voteTeam:612})} className='min-w-16 px-5 py-4 bg-white text-black'>{`Vote team ${team.shortName}`}</button>
    </div>
  )
}

const Match = () => {
  const router = useRouter()
  const { id:matchId } = router.query as {id:string}
  // useEffect(() => {router.push('/dash')}, [matchId])
  if(!matchId) return null
  const {data:cmatch}=api.match.getcmatch.useQuery({inpMatchId:matchId })
  return (
    <div className='flex gap-4'> 
      {cmatch && cmatch.match.teams.map(team=><TeamDiv matchId={matchId} team={team}/>)}
    </div>
  )
}

export default Match