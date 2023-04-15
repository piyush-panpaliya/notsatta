import { useUser } from '@clerk/nextjs'
import { Match } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { prisma } from '~/server/db'

const LiveMatch = () => {
  return (
    <div className='dev w-3/4'>
      1
    </div>
  )
}

const ListMatch = ({matches}:{matches:Match[]}) => {
  return (
    <div className='dev w-3/4 flex flex-col items-center'>
      {matches.map((match)=><p key={match.id}>{match.id}</p>)}
    </div>
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
    <div className='relative flex flex-col items-center gap-4 w-screen grow overflow-y-auto'>
      <LiveMatch/>
      <ListMatch matches={matches} />
    </div>
  )
}

export async function getStaticProps() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  // const matches=[1,2,3]
  const matches=await prisma.match.findMany({
    where:{
      startTime:{
        gte:new Date()
      }
    }
  })
  
  return {
    props: {
      matches:matches.map((match)=>{
        return{...match,startTime:match.startTime.toJSON()}
      }),
    },
    revalidate: 1*60*60, 

  }
}

export default Dash
