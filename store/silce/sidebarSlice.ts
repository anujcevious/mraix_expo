
import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isExpanded: boolean;
}

const initialState: SidebarState = {
  isExpanded: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    collapseSidebar: (state) => {
      state.isExpanded = false;
    },
  },
});

export const { toggleSidebar, collapseSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
