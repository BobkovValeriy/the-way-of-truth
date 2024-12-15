import { configureStore, createSlice } from '@reduxjs/toolkit';
import langReducer from './langagueSwitch/langReducer';

const initialState = {
    locale: 'ru',
    mobileView: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setView(state,action){
            state.mobileView = action.payload;
        }
    }
});

export const {setView} = appSlice.actions;

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        langReducer: langReducer,
    }
});

export default store;