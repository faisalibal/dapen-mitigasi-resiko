import { RisikoDetailkDTO } from '@/DTO/RiskDTO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  modalDetail: boolean;
  detail: RisikoDetailkDTO;
}

const initialState: CounterState = {
  modalDetail: false,
  detail: <RisikoDetailkDTO>{},
};

export const viewConfigurationSlice = createSlice({
  name: 'drawerUpload',
  initialState,
  reducers: {
    modalDetailToggle: (state) => {
      state.modalDetail = !state.modalDetail;
    },
    modalDetailFalse: (state) => {
      state.modalDetail = false;
    },
    modalDetailTrue: (state, action) => {
      state.modalDetail = true;
      state.detail = action.payload;
    },
  },
});

export const { modalDetailFalse, modalDetailToggle, modalDetailTrue } =
  viewConfigurationSlice.actions;

export default viewConfigurationSlice.reducer;
