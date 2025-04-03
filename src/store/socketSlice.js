// import { createSlice } from "@reduxjs/toolkit";
// const socketSlice = createSlice({
//     name:"socket",
//     initialState:{
//         socket:null
//     },
//     reducers:{
//         setSocket:(state,action)=>{
//             state.socket = action.payload;
//         }
//     }
// })

// export const {setSocket} = socketSlice.actions
// export default socketSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socketId: null, // ✅ Store only the socket ID
    },
    reducers: {
        setSocketId: (state, action) => {
            state.socketId = action.payload; // ✅ Store only `socket.id`
        }
    }
});

export const { setSocketId } = socketSlice.actions;
export default socketSlice.reducer;