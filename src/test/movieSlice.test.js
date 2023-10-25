import moviesSlice, { fetchMovies, setSearchFlag } from "../data/moviesSlice";
import { moviesMock } from "./movies.mocks";

describe("MovieSlice test", () => {
  it("should set loading true while action is pending", () => {
    const action = { type: fetchMovies.pending };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: "",
      },
      action
    );
    expect(action).toEqual({ type: fetchMovies.pending });
  });

  it("should return payload when action is fulfilled", () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: moviesMock,
    };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: "",
      },
      action
    );
    expect(action.payload).toBeTruthy();
  });

  it("should set error when action is rejected", () => {
    const action = { type: fetchMovies.rejected };
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: "",
      },
      action
    );
    expect(action).toEqual({ type: fetchMovies.rejected });
  });

  it("should set isSearch to true when setSearchFlag action is dispatched", () => {
    const initialState = {
      results: [],
      fetchStatus: "success",
      isSearch: false,
      page: 1,
    };

    const action = setSearchFlag(true);

    const newState = moviesSlice.reducer(initialState, action);

    expect(newState.isSearch).toEqual(true);
    expect(newState.results).toEqual([]);
  });
});
