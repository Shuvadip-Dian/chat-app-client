import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import {  setSocketId } from './store/socketSlice';
import { setOnlineUsers } from './store/userSlice';

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<HomePage/>
//   },
//   {
//     path:"/register",
//     element:<Signup/>
//   },
//   {
//     path:"/login",
//     element:<Login/>
//   }
// ])

function App() {
  const {authUser} = useSelector(store=>store.user);
  //const {socket} = useSelector(store=>store.socket);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch()

  useEffect(()=>{
    if(authUser){
      const socketio = io('http://localhost:8080',{
        query:{
          userId:authUser._id
        }
      });
      setSocket(socketio)
      
      // Listen for the connect event to get the socket ID
      socketio.on("connect", () => {
        console.log("Connected with socket ID:", socketio.id);
        dispatch(setSocketId(socketio.id)); // Now the socket ID will be correctly dispatched
      });

      socketio?.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });
      return ()=>socketio.close();
    }else{
      if(socket){
        socket.close();
        setSocket(null);
        dispatch(setSocketId(null));
      }
    }
  },[authUser])

  const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage socket={socket}/>
    },
    {
      path:"/register",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
