/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/rockets';

export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',
  async () => {
    const response = await axios.get(url);
    response.data.forEach((object) => {
      object.reserved = false;
    });
    return response.data;
  }
);

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
  reserved: [],
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const rocket = state.rockets.find(
        (results) => results.id === action.payload
      );
      rocket.reserved = !rocket.reserved;
    },
    myReservedRockets: (state) => {
      const rockets = state.rockets.filter(
        (rocket) => rocket.reserved === true
      );

      return { ...state, reserved: rockets };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchRockets.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        rockets: action.payload,
      }))
      .addCase(fetchRockets.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { reserveRocket, myReservedRockets } = rocketsSlice.actions;
export default rocketsSlice.reducer;
