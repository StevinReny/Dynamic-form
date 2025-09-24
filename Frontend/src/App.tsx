
import { Outlet } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { socket } from './socket/socket'
  import { ToastContainer, toast } from 'react-toastify';


function App() {
  
  useEffect(()=>{
    socket.on("sendNotification",(message)=>{
      toast.success(message)
    })
    return () => {
    socket.off("sendNotification",);
  };
  },[])

  return (
    <>
      <Outlet/>
      <ToastContainer/>
    </>
  )
}

export default App
