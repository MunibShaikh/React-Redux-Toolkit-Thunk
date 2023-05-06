import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://64457b10914c816083cfbf57.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Read Action
export const readUser = createAsyncThunk(
  "readUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://64457b10914c816083cfbf57.mockapi.io/users"
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Delete Action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (data, { rejectWithValue }) => {
    let response = await fetch(
      `https://64457b10914c816083cfbf57.mockapi.io/users/${data}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    let response = await fetch(
      `https://64457b10914c816083cfbf57.mockapi.io/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Create Slice
export const userDetail = createSlice({
  // Reducer Part
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchUsers: [],
  },
  // Api Part
  /*
  Old method
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
  },*/
  // New method
  reducers: {
    searchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(readUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(readUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((item) => item.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (id) {
          state.users = state.users.map(
            (item) => (item = item.id === id ? action.payload : item)
          );
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export default userDetail.reducer;
export const { searchUsers } = userDetail.actions;
