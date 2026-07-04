import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  currentUser: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateUserSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
    },
  },
})

export const { signInStart, signInSuccess, signInFailure, updateUserSuccess } =
  userSlice.actions
export default userSlice.reducer
