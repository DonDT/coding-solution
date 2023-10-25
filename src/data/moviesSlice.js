import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.log("Error", response);
      throw new Error("Network response was not ok, could not fetch movies");
    }
    return response.json();
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    results: [],
    fetchStatus: "",
    isSearch: false,
    page: 1,
  },
  reducers: {
    setSearchFlag: (state, action) => {
      state.isSearch = action.payload;
      if (action.payload === false) {
        state.results = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.results)) {
          if (state.isSearch) {
            if (action.payload.page === 1)
              state.results = action.payload.results;
            else state.results = state.results.concat(action.payload.results);
          } else {
            const newResults = action.payload.results.filter((newMovie) => {
              return !state.results.some(
                (existingMovie) => existingMovie.id === newMovie.id
              );
            });
            state.results = state.results.concat(newResults);
          }
        }
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const { setSearchFlag } = moviesSlice.actions;

export default moviesSlice;
