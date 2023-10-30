import {combineReducers} from 'redux';
import {api} from "@mpr/services";
import ui from './ui';
import prediction from './prediction'

export default combineReducers({
    [api.reducerPath]: api.reducer,
    ui,
    prediction
});
