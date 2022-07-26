import { createReducer } from "@reduxjs/toolkit"
import { heroCreated, heroDeleted, heroesFetched, heroesFetching, heroesFetchingError } from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(
    initialState,
    {
        [heroesFetching]: state => {
            state.heroesLoadingStatus = 'loading'
        },
        [heroesFetched]: (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload
        },
        [heroesFetchingError]: state => {
            state.heroesFetchingError = 'error'
        },
        [heroCreated]: (state, action) => {
            state.heroes.push(action.payload)
        },
        [heroDeleted]: (state, action) => {
            state.heroes.filter((item) => item.id !== action.payload)
        }
    }, [],
    (state) => state
)

export default heroes;