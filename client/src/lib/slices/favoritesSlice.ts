import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: string;
  path: string;
  label: string;
  icon: string;
  parent?: string;
}

interface FavoritesState {
  favorites: MenuItem[];
}

const initialState: FavoritesState = {
  favorites: []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MenuItem>) => {
      if (!state.favorites.some(item => item.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    reorderFavorites: (state, action: PayloadAction<MenuItem[]>) => {
      state.favorites = action.payload;
    }
  }
});

export const { addFavorite, removeFavorite, reorderFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;