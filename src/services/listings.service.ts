/**
 * Listings Service
 * API calls for listings management
 */

import { api, ApiResponse, PaginatedResponse, handleApiError } from './api';

export interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  location: string;
  status: 'active' | 'sold' | 'archived' | 'draft';
  views: number;
  saves: number;
  messages: number;
  postedDate: string;
  soldPrice?: number;
  soldDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListingDto {
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  location: string;
}

export interface UpdateListingDto extends Partial<CreateListingDto> {
  status?: 'active' | 'sold' | 'archived' | 'draft';
}

class ListingsService {
  private readonly baseUrl = '/listings';

  /**
   * Get user's listings
   */
  async getMyListings(params?: {
    status?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Listing>> {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Listing>>>(
        `${this.baseUrl}/my`,
        { params }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Get single listing by ID
   */
  async getListingById(id: string): Promise<Listing> {
    try {
      const response = await api.get<ApiResponse<Listing>>(`${this.baseUrl}/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Create new listing
   */
  async createListing(data: CreateListingDto): Promise<Listing> {
    try {
      const response = await api.post<ApiResponse<Listing>>(this.baseUrl, data);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Update listing
   */
  async updateListing(id: string, data: UpdateListingDto): Promise<Listing> {
    try {
      const response = await api.patch<ApiResponse<Listing>>(
        `${this.baseUrl}/${id}`,
        data
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Delete listing
   */
  async deleteListing(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Mark listing as sold
   */
  async markAsSold(
    id: string,
    soldPrice: number,
    soldOn: 'offerup' | 'elsewhere'
  ): Promise<Listing> {
    try {
      const response = await api.post<ApiResponse<Listing>>(
        `${this.baseUrl}/${id}/sold`,
        { soldPrice, soldOn }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Archive listing
   */
  async archiveListing(id: string): Promise<Listing> {
    try {
      const response = await api.post<ApiResponse<Listing>>(
        `${this.baseUrl}/${id}/archive`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Restore archived listing
   */
  async restoreListing(id: string): Promise<Listing> {
    try {
      const response = await api.post<ApiResponse<Listing>>(
        `${this.baseUrl}/${id}/restore`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Duplicate listing
   */
  async duplicateListing(id: string): Promise<Listing> {
    try {
      const response = await api.post<ApiResponse<Listing>>(
        `${this.baseUrl}/${id}/duplicate`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Promote listing
   */
  async promoteListing(
    id: string,
    tier: 'basic' | 'premium' | 'ultimate',
    duration: number
  ): Promise<Listing> {
    try {
      const response = await api.post<ApiResponse<Listing>>(
        `${this.baseUrl}/${id}/promote`,
        { tier, duration }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Get listing insights
   */
  async getListingInsights(id: string): Promise<{
    views: number;
    saves: number;
    messages: number;
    uniqueViewers: number;
    conversionRate: number;
    viewsOverTime: number[];
  }> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}/insights`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Bulk delete listings
   */
  async bulkDelete(ids: string[]): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/bulk/delete`, { ids });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Bulk archive listings
   */
  async bulkArchive(ids: string[]): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/bulk/archive`, { ids });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export const listingsService = new ListingsService();
