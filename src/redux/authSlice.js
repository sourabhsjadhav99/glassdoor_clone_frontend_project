// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';

const initialState = {
  user: null,
  userEmail: null,
  userId: null,
  status: 'idle',
  error: null,
};

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      return userCredentials.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      return userCredentials.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.userEmail = action.payload?.email || null;
      state.userId = action.payload?.uid || null;
    },
    clearUser(state) {
      state.user = null;
      state.userEmail = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userEmail = action.payload.email;
        state.userId = action.payload.uid;
        state.status = 'succeeded';
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userEmail = action.payload.email;
        state.userId = action.payload.uid;
        state.status = 'succeeded';
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userEmail = action.payload.email;
        state.userId = action.payload.uid;
        state.status = 'succeeded';
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.userEmail = null;
        state.userId = null;
        state.status = 'succeeded';
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

export const listenToAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  });
};
