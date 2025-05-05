import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface LoginPayload {
  email: string;
  password: string;
}

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
  };
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

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );
    // const data = await response.json();
    // if (!data.status) {
    //   throw new Error(data.message || "Registration failed");
    // }
    return response;
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgotpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    return response;
  },
);

export const verifyResetPassword = createAsyncThunk(
  "auth/verifyResetPassword",
  async ({
    email,
    password,
    confirmpassword,
  }: {
    email: string;
    password: string;
    confirmpassword: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verifyforgotpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmpassword }),
      },
    );
    // const data = await response.json();
    // if (!data.status) {
    //   throw new Error(data.message || "Password reset failed");
    // }
    return response;
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verify",
  async ({
    email,
    verificationcode,
  }: {
    email: string;
    verificationcode: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationcode }),
      },
    );
    const data = await response.json();
    if (!data.status) {
      throw new Error(data.message || "OTP verification failed");
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginPayload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );
    // const data = await response.json();
    // if (!data.status) {
    //   throw new Error(data.message || "Login failed");
    // }
    return response;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
