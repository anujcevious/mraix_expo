
import { createSlice } from '@reduxjs/toolkit';

interface GlobalSettingState {
  isExpanded: boolean;
}

const initialState: GlobalSettingState = {
  isExpanded: true,
};

export const globalSettingSlice = createSlice({
  name: 'globalSetting',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { toggleSidebar } = globalSettingSlice.actions;
export default globalSettingSlice.reducer;
