import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "@/config/env";
import { LoginInput, RegisterInput } from "../../../shared/authSchema";

interface AuthState {
  user: {
    email?: string;
    userid?: string;
    action?: {
      ispartner: boolean;
      isverified: boolean;
      issuperadmin: boolean;
      issuspended: boolean;
    };
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginInput, { rejectWithValue }) => {
    try {
      const response = await fetch(`${env.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!data.status) {
        return rejectWithValue(data.message || "Login failed");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${env.API_BASE_URL}/auth/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!data.status) {
        return rejectWithValue(data.message || "Password reset request failed");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Password reset request failed");
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { email, verificationcode }: { email: string; verificationcode: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${env.API_BASE_URL}/auth/verify/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationcode }),
      });
      const data = await response.json();
      if (!data.status) {
        return rejectWithValue(data.message || "OTP verification failed");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "OTP verification failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterInput, { rejectWithValue }) => {
    try {
      const response = await fetch(`${env.API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      // const data = await response.json();
      // if (!data.status) {
      //   return rejectWithValue(data.message || "Registration failed");
      // }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          email: action.payload.email,
          userid: action.payload.userid,
          action: action.payload.action,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout, loginStart, loginSuccess, loginFailure } =
  authSlice.actions;
export default authSlice.reducer;
