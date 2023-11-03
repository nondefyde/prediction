import { persistor } from '@mpr/redux/store';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  predictions: Record<string, any>[] | undefined;
  trimmedPredictions: Record<string, any>[] | undefined;
}
const initialState = {
  predictions: [],
  trimmedPredictions: []
} as initialStateProps;

const PREDICTION_KEY = 'prediction';

export const predictionSlice = createSlice({
    name: PREDICTION_KEY, 
    initialState,
    reducers: {
      generatePrediction: (state, action) => {
        if (state.predictions) {
          // state.predictions = state.predictions.concat(action.payload.predictions);
          state.predictions = action.payload.predictions;
        }
      },
      trimPrediction: (state, action) => {
        if (state.predictions) {
          state.trimmedPredictions = action.payload.trimmedPredictions;
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

export const { generatePrediction, trimPrediction, clearPrediction } = predictionSlice.actions;

export default predictionSlice.reducer;
