import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const counterState = {value:0 }

const counterSlice = createSlice({
    name:'counter',
    initialState:counterState,
    reducers:{
        increment: (state)=>{
            state.value++;
            console.log("incremented the counter state..")
        },
        decrement: (state)=>{
            state.value--;
            console.log("decremented the counter state..")
        },
        reset: (state)=>{
            state.value = 0;
            console.log("resetted the counter state..")
        },
        incrementByAmount: (state, action)=>{
            state.value += action.payload;
            console.log("incremented by ", action.payload)
        },
        decrementByAmount: (state, action)=>{
            state.value -= action.payload;
            console.log("decremented by ",action.payload)
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(incrementByAsync.pending, ()=>{
            console.log("incrementing by async..")
        }).addCase(incrementByAsync.fulfilled, (state)=>{
            state.value++;
        }).addCase(decrementByAsync.pending, ()=>{
            console.log("decrementing by async..");
        }).addCase(decrementByAsync.fulfilled, (state)=>{
            state.value--;
        }).addCase(incrementByAmountAsync.pending, ()=>{
            console.log("incrementing by amount async..");
        }).addCase(incrementByAmountAsync.fulfilled, (state, action)=>{
            state.value += action.payload;
        }) 
    },
})


export const {
    increment, decrement, reset, 
    incrementByAmount, decrementByAmount
} = counterSlice.actions;

export const incrementByAsync = createAsyncThunk(
    'counter/incrementByAsync',
    async (amount)=>{
        await new Promise(resolve=>setTimeout(resolve,1000))
        return amount;
    }
)

export const decrementByAsync = createAsyncThunk(
    'counter/decrementByAsync',
    async (amount)=>{
        await new Promise(resolve=>setTimeout(resolve,1000))
        return amount;
    }
)

export const incrementByAmountAsync = createAsyncThunk(
    'counter/incrementByAmountAsync',
    async (amount)=>{
        await new Promise(resolve=>setTimeout(resolve, 1000))
        return amount;
    }
)

export default counterSlice.reducer;
