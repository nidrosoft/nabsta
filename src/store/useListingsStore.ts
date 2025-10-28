/**
 * Listings Store
 * Global listings state management
 */

import { create } from 'zustand';
import { listingsService, Listing } from '../services';

interface ListingsState {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  filters: {
    status: 'all' | 'active' | 'sold' | 'archived';
    searchQuery: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };

  // Actions
  fetchListings: (refresh?: boolean) => Promise<void>;
  updateListing: (id: string, data: Partial<Listing>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  markAsSold: (id: string, soldPrice: number, soldOn: 'offerup' | 'elsewhere') => Promise<void>;
  archiveListing: (id: string) => Promise<void>;
  duplicateListing: (id: string) => Promise<void>;
  promoteListing: (id: string, tier: 'basic' | 'premium' | 'ultimate', duration: number) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
  bulkArchive: (ids: string[]) => Promise<void>;
  setFilter: (key: keyof ListingsState['filters'], value: any) => void;
  clearError: () => void;
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  listings: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  filters: {
    status: 'all',
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',
  },

  fetchListings: async (refresh = false) => {
    const { currentPage, filters, listings } = get();
    const page = refresh ? 1 : currentPage;

    set({ isLoading: true, error: null });
    
    try {
      const response = await listingsService.getMyListings({
        status: filters.status === 'all' ? undefined : filters.status,
        page,
        limit: 20,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      set({
        listings: refresh ? response.data : [...listings, ...response.data],
        currentPage: page + 1,
        hasMore: response.hasMore,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch listings',
        isLoading: false,
      });
    }
  },

  updateListing: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await listingsService.updateListing(id, data);
      set((state) => ({
        listings: state.listings.map((l) => (l.id === id ? updated : l)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update listing',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteListing: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await listingsService.deleteListing(id);
      set((state) => ({
        listings: state.listings.filter((l) => l.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete listing',
        isLoading: false,
      });
      throw error;
    }
  },

  markAsSold: async (id, soldPrice, soldOn) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await listingsService.markAsSold(id, soldPrice, soldOn);
      set((state) => ({
        listings: state.listings.map((l) => (l.id === id ? updated : l)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to mark as sold',
        isLoading: false,
      });
      throw error;
    }
  },

  archiveListing: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await listingsService.archiveListing(id);
      set((state) => ({
        listings: state.listings.map((l) => (l.id === id ? updated : l)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to archive listing',
        isLoading: false,
      });
      throw error;
    }
  },

  duplicateListing: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const duplicated = await listingsService.duplicateListing(id);
      set((state) => ({
        listings: [duplicated, ...state.listings],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to duplicate listing',
        isLoading: false,
      });
      throw error;
    }
  },

  promoteListing: async (id, tier, duration) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await listingsService.promoteListing(id, tier, duration);
      set((state) => ({
        listings: state.listings.map((l) => (l.id === id ? updated : l)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to promote listing',
        isLoading: false,
      });
      throw error;
    }
  },

  bulkDelete: async (ids) => {
    set({ isLoading: true, error: null });
    try {
      await listingsService.bulkDelete(ids);
      set((state) => ({
        listings: state.listings.filter((l) => !ids.includes(l.id)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete listings',
        isLoading: false,
      });
      throw error;
    }
  },

  bulkArchive: async (ids) => {
    set({ isLoading: true, error: null });
    try {
      await listingsService.bulkArchive(ids);
      set((state) => ({
        listings: state.listings.map((l) =>
          ids.includes(l.id) ? { ...l, status: 'archived' as const } : l
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to archive listings',
        isLoading: false,
      });
      throw error;
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  clearError: () => set({ error: null }),
}));
