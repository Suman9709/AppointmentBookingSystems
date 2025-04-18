import { createSlice } from "@reduxjs/toolkit";

const userFormStorage = JSON.parse(localStorage.getItem('authUser'))
const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userFormStorage || null,
        allUsers: allUsers,
        isLoggedIn: !!userFormStorage,
        isAuthenticated:JSON.parse(localStorage.getItem("isAuthenticated"))|| false,

    },
    reducers: {
        signUp: (state, action) => {
            const { username } = action.payload;

            const existingUser = state.allUsers.some(user => user.username === username)
            if (existingUser) {
                alert("user already exist with this username");
                return;
            }
            state.allUsers.push(action.payload);
            localStorage.setItem('allUsers', JSON.stringify(state.allUsers));
            alert("signUp Successfully");
        },
        login: (state, action) => {
            const { username, password } = action.payload;
            const user = state.allUsers.find((user) => user.username === username && user.password === password)
            if (user) {
                state.user = user
                state.isLoggedIn = true;
                state.isAuthenticated=true;
                localStorage.setItem('authUser', JSON.stringify(user))
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('role', user.role)
            }
            else {
                alert("Invalid username || password")
                return;
            }
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isAuthenticated=false;
            localStorage.removeItem('authUser')
            localStorage.setItem('isAuthenticated', false);
            localStorage.removeItem('role')
        },

    }
})

export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;