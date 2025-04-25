import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  user: any,
  loadingAuth: boolean,
  currentView: 'seller' | 'admin' | undefined
}

let initialState: InitialStateType = {
  user: null,
  loadingAuth: true,
  currentView: undefined
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
    setLoadingAuth: (state, action) => {
      state.loadingAuth = action.payload
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload
    }
  }
})

export const { setAuthUser, setCurrentView, setLoadingAuth } = authSlice.actions
export default authSlice.reducer