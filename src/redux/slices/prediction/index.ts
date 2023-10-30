import { persistor } from '@mpr/redux/store';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  predictions: Record<string, any>[] | undefined;
}
const initialState = {
  predictions: [],
} as initialStateProps;

const PREDICTION_KEY = 'prediction';

export const predictionSlice = createSlice({
    name: PREDICTION_KEY, 
    initialState,
    reducers: {
      generatePrediction: (state, action) => {
        if (state.predictions) {
          state.predictions = state.predictions.concat(action.payload.predictions);
        }
      },
      clearPrediction: () => {
        return initialState;
      },
    },
  });

  export const clearPredictionMiddleware = (store: any) => (next: any) => async (action: any) => {
    if (predictionSlice.actions.clearPrediction.match(action)) {
        await persistor.purge();
    }
    return next(action);
};

export const { generatePrediction, clearPrediction } = predictionSlice.actions;

export default predictionSlice.reducer;
