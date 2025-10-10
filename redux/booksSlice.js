import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch books by category (selected, recommended, etc.)
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (status, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();

      // Some APIs wrap the array in { books: [...] }
      return Array.isArray(data) ? data : data.books || [];
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    selected: [],
    recommended: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional synchronous reducers if needed later
    clearBooks: (state) => {
      state.selected = [];
      state.recommended = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        const status = action.meta.arg;
        if (status === "selected") state.selected = action.payload;
        if (status === "recommended") state.recommended = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching books";
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export default booksSlice.reducer;