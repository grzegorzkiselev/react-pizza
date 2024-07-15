import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/Api";
import { GetProfileResponse, LoginResponse } from "../interfaces/auth.interface";
import { loadState } from "./storage";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null
}

export interface UserSlice {
  jwt: string | null;
  email?: string;
  name?: string;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  getProfileErrorMessage?: string;
}

const initialState: UserSlice = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk("user/login",
  async (params: { email: string, password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/login`, {
        email: params.email,
        password: params.password
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk("user/register",
  async (params: { email: string, name: string, password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/register`, {
        email: params.email,
        name: params.name,
        password: params.password
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<GetProfileResponse, void, { state: RootState }>("user/profile",
  async (_, thunkAPI) => {
    try {
      // const jwt = loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt;
      const jwt = thunkAPI.getState().user.jwt;
      const { data } = await axios.get<GetProfileResponse>(`${PREFIX}user/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // addJwt: (state, action: PayloadAction<string>) => {
    //   state.jwt = action.payload;
    // },
    logout: (state) => {
      state.jwt = null;
    },
    cleanLoginError: (state) => {
      state.loginErrorMessage = "";
    },
    cleanRegisterError: (state) => {
      state.registerErrorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.jwt = action.payload.access_token;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload) {
        state.jwt = action.payload.access_token;
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.email = action.payload.email;
        state.name = action.payload.name;
      }
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.getProfileErrorMessage = action.error.message;
    });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;