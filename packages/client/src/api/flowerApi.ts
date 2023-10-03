import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'src/redux';
import { Flower } from 'src/types';
import { baseQuery } from './api';

type DeleteResult = {
  success: boolean;
  id: number;
}

// Define a service using a base URL and expected endpoints
export const flowerApi = createApi({
  reducerPath: 'flowerApi',
  baseQuery, 
  tagTypes: ['flower'],
  endpoints: builder => ({
    getAllFlowers: builder.query<Flower[], void>({
      query: () => `flowers`,
      providesTags: (flowers = []) =>
        flowers.map(f => ({
            type: 'flower',
            id: f.id.toString()
          } as const
        )).concat({ type: 'flower' as const, id: 'LIST' })
    }),
    getFlower: builder.query<Flower, string>({
      query: id => `flowers/${id}`,
      providesTags: flower => [{ type: 'flower', id: flower?.id }]
    }),
    updateFlower: builder.mutation<Flower, Partial<Flower>>({
      query: flower => ({
        url: `flowers/${flower.id}`,
        method: 'PATCH',
        body: flower
      }),
      invalidatesTags: flower => [{ type: 'flower', id: flower?.id }]
    }),
    deleteFlower: builder.mutation<DeleteResult, number>({
      query: id => ({
        url: `flowers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => [{ type: 'flower', id: result?.id }]
    }),
    addFlower: builder.mutation<Flower, Partial<Flower>>({
      query: flower => ({
        url: 'flowers',
        method: 'POST',
        body: flower
      }),
      invalidatesTags: [{ type: 'flower', id: 'LIST' }]
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllFlowersQuery,
  useGetFlowerQuery,
  useUpdateFlowerMutation,
  useDeleteFlowerMutation,
  useAddFlowerMutation
} = flowerApi;