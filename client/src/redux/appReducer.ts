import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  user: string;
  token: string;
};

let appInitialState: AppState = {
  user: "",
  token: "",
};

const storedData = localStorage.getItem("flower-api");

if (storedData) {
  const data = JSON.parse(storedData);

  appInitialState.token = data.token;
  appInitialState.user = data.username;
}

type LoginPayload = {
  username: string;
  token: string;
};

export const appSlice = createSlice({
  name: "appContext",
  initialState: appInitialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.username;
      state.token = action.payload.token;
    },
  },
});

export const { login } = appSlice.actions;

export const appReducer = appSlice.reducer;
