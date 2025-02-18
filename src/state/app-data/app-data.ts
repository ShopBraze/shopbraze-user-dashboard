import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  isAppViewChanging: boolean
}

let initialState: InitialStateType = {
  isAppViewChanging: false
}

const appDataSlice = createSlice({
  name: 'appDataSlice',
  initialState,
  reducers: {
    setAppViewChanging: (state, action) => {
      state.isAppViewChanging = action.payload
    }
  }
})

export const { setAppViewChanging } = appDataSlice.actions
export default appDataSlice.reducer