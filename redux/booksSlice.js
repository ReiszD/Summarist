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

// Fetch a single book by ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch book");
      const data = await res.json();
      return data;
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
    suggested: [],
    currentBook: null,
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
        if (status === "suggested") state.suggested = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching books";
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching book";
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export default booksSlice.reducer;