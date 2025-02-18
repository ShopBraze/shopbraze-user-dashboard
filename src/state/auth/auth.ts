import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  user: any,
  currentView: 'seller' | 'admin' | undefined
}

let initialState: InitialStateType = {
  user: null,
  currentView: undefined
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload
    }
  }
})

export const { setAuthUser, setCurrentView } = authSlice.actions
export default authSlice.reducer