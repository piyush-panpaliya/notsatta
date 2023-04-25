import { useUser } from '@clerk/nextjs'
import  { Cmatch, Match, Team } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { prisma } from '~/server/db'
import { api } from '~/utils/api'
import Link from 'next/link' 

const MatchTab=({match}:{match:Cmatch })=>{
  return(
    <Link href={`/match/${match.matchId}`} className='w-full flex justify-between items-center py-4 sm:py-6 px-4 bg-white '>
      {/* @ts-expect-error */}
      <TeamNames teams={match.match.teams} />
      <p>{match.status==='OPEN'?'vote now':'live now'}</p>
    </Link>
  )
}


export const TeamNames = ({teams}:{teams:Team[]}) => {
  return (
    <div className='grow flex justify-between items-center  px-4 sm:px-8'>
      <div className='flex gap-2 sm:gap-4 items-center '>
        <img src={teams[0]?.flag} className='w-8 h-8' />
        <p className='w-4'>{teams[0]?.shortName}</p>
      </div>
      <p>v/s</p>
      <div className='flex gap-2 sm:gap-4 items-center '>
        <p className='w-4'>{teams[1]?.shortName}</p>
        <img src={teams[1]?.flag} className='w-8 h-8' />
      </div>
    </div>
  )
}

const LiveMatch = () => {
  const {data}= api.match.getcmatches.useQuery(undefined,{refetchOnWindowFocus:false})
  return (
    <div className='w-[80%] text-black'>
      // @ts-expect-error
      {data && data.map(match=><MatchTab match={match}/>) }
    </div>
  )
}

const ListMatch = ({match}:{match:Match}) => {
  return (
    <div className='py-4 sm:py-6 w-[80%] border-b-[1px] border-white'>
      {/* @ts-expect-error */}
      <TeamNames teams={match.teams}/>
    </div >
  )
}

const Dash = ({matches}:{matches:Match[]}) => {
  const {user}= useUser()
  const router = useRouter()
  useEffect(() => {
    if(user && (!user?.publicMetadata.username || !user?.publicMetadata.room)) {
      router.push('/hello')
    }
  }, [user])

  return (
    <div className='relative flex flex-col items-center gap-16 w-screen md:max-w-[768px] grow overflow-y-auto px-12 sm:px-10 pt-[5vh]'>
      <div className='w-full flex items-center justify-between '>
        <p className='text-xl sm:text-5xl'>Room Name</p>
        <p className='text-xl sm:text-2xl font-bold'>Ranking</p>
      </div>
      <LiveMatch/>
      <div className=' w-full flex flex-col items-center border-[1px] border-white'>
        <div className='w-full flex items-center justify-around'>
          <p className='text-xl w-1/2 text-center py-4 border-b-[1px] border-r-0 border-white sm:text-2xl font-bold'>Upcoming Matches</p>
          <p className='text-xl w-1/2 text-center py-4 border-l-[1px] border-b-[1px] border-white sm:text-2xl font-bold'>Past Matches</p>

        </div>
      {matches.map((match)=> <ListMatch match={match} key={match.id} />)}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const tomorrow  = new Date(); 
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(1,0,0,0)
  const matches=await prisma.match.findMany({
    where:{
      startTime:{
        gte:tomorrow,
      }
    },
    include:{
      teams:true
    },
    orderBy:{
      startTime:'asc'
    }
  })
  return {
    props: {
      matches:matches.map((match)=>{
        return{...match,startTime:match.startTime.toJSON()}
      }),
    },
    revalidate: 10*60*60, 

  }
}

export default Dash
