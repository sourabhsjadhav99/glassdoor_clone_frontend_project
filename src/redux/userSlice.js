// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, addDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';

const initialState = {
  userData: null,
  pdfURL: null,
  status: 'idle',
  error: null,
};

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (uid, { rejectWithValue }) => {
    try {
      const userDocQuery = query(collection(db, 'userInfo'), where('userId', '==', uid));
      const querySnapshot = await getDocs(userDocQuery);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        throw new Error('No such user data!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadUserInfo = createAsyncThunk(
  'user/uploadUserInfo',
  async ({ firstname, lastname, mobile, role, pdfFile, user }, { rejectWithValue }) => {
    try {
      const pdfRef = ref(storage, `upload/pdf/${Date.now()}-${pdfFile.name}`);
      const uploadResult = await uploadBytes(pdfRef, pdfFile);
      await addDoc(collection(db, 'userInfo'), {
        firstname,
        lastname,
        mobile,
        role,
        pdfURL: uploadResult.ref.fullPath,
        userId: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        savedJobs: [
          { id: 1, role: 'frontend' },
          { id: 2, role: 'backend' },
          { id: 3, role: 'fullstack' },
        ],
        appliedJobs: [
          { id: 1, role: 'frontend' },
          { id: 2, role: 'backend' },
          { id: 3, role: 'fullstack' },
        ],
      });
      return await fetchUserData(user.uid);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async ({ newData, user }, { rejectWithValue }) => {
    try {
      const userDocQuery = query(collection(db, 'userInfo'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(userDocQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, newData);
        return await fetchUserData(user.uid);
      } else {
        throw new Error('No such user data to update!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPdfUrl = createAsyncThunk(
  'user/fetchPdfUrl',
  async (path, { rejectWithValue }) => {
    try {
      return await getDownloadURL(ref(storage, path));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(uploadUserInfo.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(uploadUserInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchPdfUrl.fulfilled, (state, action) => {
        state.pdfURL = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPdfUrl.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
