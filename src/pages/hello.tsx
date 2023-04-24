import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api'

const Hello = () => {
  const [username, setUsername] = useState('')
  const [roomName, setRoomName] = useState('')

  const {user}= useUser()
  const router = useRouter()

  const {data,error,isError,isLoading,mutateAsync:joinRoom}=api.room.join.useMutation()
  const {mutateAsync:updateUsername}=api.user.username.useMutation()
  const {mutateAsync}=api.room.create.useMutation()

  useEffect(() => {
    if(user?.publicMetadata.room && user?.publicMetadata.username) {
      router.push('/dash')
    }
  }, [user])

  return (
    <div className='relative flex flex-col items-center gap-3 w-screen  md:max-w-[768px] grow overflow-y-auto'>
      <img src='media/waves.svg' className='absolute h-[80vh] lg:h-screen w-[200vw] left-[-25vw] sm:w-[130vw] lg:w-[100vw] max-w-none top-8 z-[-1] opacity-20 ' />
      <div className='w-[80vw] sm:w-[60%] mt-[10vh]  flex flex-col items-center gap-10 '>
        <p className='text-2xl sm:text-4xl lg:text-3xl w-full '>create your username</p>
        <input 
          type='text' 
          value={username} 
          placeholder='enter your username'
          onChange={(e)=>setUsername(e.target.value)}
          className='w-[80vw] sm:w-full  border-4 place border-white bg-gray-100 bg-transparent text-white px-2 sm:px-4 py-2 sm:py-4 text-xl sm:text-2xl'
        />
      </div>
      <div className='w-[80vw] sm:w-[60%] mt-[10vh]  flex flex-col items-center gap-10 '>
        <p className='text-2xl sm:text-4xl w-full '>wanna create your room?</p>
        <input 
          type='text' 
          value={roomName} 
          placeholder='enter your username'
          onChange={(e)=>setRoomName(e.target.value)}
          className='w-[80%] sm:w-full border-4 place border-white bg-gray-100 bg-transparent text-white px-2 sm:px-4 py-2 sm:py-4 text-xl sm:text-2xl'
        />
        <button onClick={()=>mutateAsync({roomName})}>create room</button>
        <button onClick={()=>joinRoom({slug:roomName})}> join</button>
        <button onClick={()=>{updateUsername({username})}}> update username</button>
      </div>
    </div>
  )
}

export default Hello