import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Arrangement, Project } from "src/types";
import { baseQuery } from "./api";

type UpsertArrangementResponse = {
  projectId: number;
  arrangements: Arrangement[];
};

type DeleteArrangementRequest = {
  projectId: number;
  arrangementId: number;
};

type DeleteArrangementResponse = {
  projectId: number;
  id: number;
};

type DeleteArrangedFlowerRequest = {
  projectId: number;
  arrangementId: number;
  flowerId: number;
};

type DeleteArrangedFlowerResponse = {
  projectId: number;
  id: number;
  flowerId: number;
};

// Define a service using a base URL and expected endpoints
export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery,
  tagTypes: ["project"],
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => "projects",
      providesTags: (projects = []) =>
        projects
          .map(
            (p) =>
              ({
                type: "project",
                id: p.id.toString(),
              } as const)
          )
          .concat({ type: "project" as const, id: "LIST" }),
    }),
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
      providesTags: (project) => [{ type: "project", id: project?.id }],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "project", id: "LIST" }],
    }),
    updateProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: `projects/${project.id}`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: (project) => [{ type: "project", id: project?.id }],
    }),
    upsertArrangement: builder.mutation<UpsertArrangementResponse, Partial<Project>>({
      query: (project) => ({
        url: `projects/${project.id}/arrangement`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: (r) => [{ type: "project", id: r?.projectId }],
    }),
    deleteArrangement: builder.mutation<DeleteArrangementResponse, DeleteArrangementRequest>({
      query: (project) => ({
        url: `projects/${project.projectId}/arrangement/${project.arrangementId}`,
        method: "DELETE",
      }),
      invalidatesTags: (response) => [{ type: 'project', id: response?.projectId }],
    }),
    deleteArrangedFlower: builder.mutation<DeleteArrangedFlowerResponse, DeleteArrangedFlowerRequest>({
      query: project => ({
        url: `projects/${project.projectId}/arrangement/${project.arrangementId}/${project.flowerId}`,
        method: 'DELETE'
      }),
      invalidatesTags: project => [{ type: 'project', id: project?.projectId }]
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUpsertArrangementMutation,
  useDeleteArrangedFlowerMutation,
  useDeleteArrangementMutation,
} = projectApi;
