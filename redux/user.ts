import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import jwt from "jsonwebtoken"

export interface User {
    id: string,
    role: "Admin" | "Viewer",
    access_token: string,
}

export interface AuthOutput {
    authenticate: {
        access_token: string,
        refresh_token: string
    }
}

export interface AuthInput {
    password: string
}

const userSlice = createSlice({
    name: "user",
    initialState: null as User | null,
    reducers: {
        setUser: (state, action: PayloadAction<AuthOutput | null>) => {

            if (!action.payload) {
                return null
            }

            const {id, role} = jwt.decode(action.payload.authenticate.access_token) as User

            localStorage.setItem("token", action.payload.authenticate.refresh_token)
            
            return {
                id,
                role,
                access_token: action.payload.authenticate.access_token,
            }
        }
    }
})

export const { setUser} = userSlice.actions

export default userSlice.reducer
