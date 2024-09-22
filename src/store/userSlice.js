import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUser:null,
        selectedUser:null,
        onlineUsers:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUser = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,actions)=>{
            state.onlineUsers = actions.payload
        }
    }
})

export const {setAuthUser,setOtherUsers,setSelectedUser, setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;