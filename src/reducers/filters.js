import { createReducer } from "@reduxjs/toolkit"
import { activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError } from "../actions";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
}

const filters = createReducer(
    initialState,
    {
        [filtersFetched]: (state, action) => {
            state.filtersLoadingStatus = 'idle'
            state.filters = action.payload
        },
        [filtersFetching]: state => {
            state.filtersLoadingStatus = 'loading'
        },
        [filtersFetchingError]: state => {
            state.filtersLoadingStatus = 'error'
        },
        [activeFilterChanged]: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    [], (state) => state
)

export default filters;