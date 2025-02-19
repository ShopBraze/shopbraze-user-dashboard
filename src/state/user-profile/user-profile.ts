import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  userProfile: any
}

let initialState: InitialStateType = {
  userProfile: null
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
  }
})

export const { setUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer