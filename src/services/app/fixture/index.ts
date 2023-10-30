import {DELETE, GET, POST, fixturesUrl} from "@mpr/_shared/constant";
import {api} from "@mpr/services";
import {FIXTURE_TAG} from "@mpr/services/app/tags";

export const fixtureApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFixtures: builder.query<any, any>({
            query: ({payload}) => {
                return {
                    url: fixturesUrl,
                    method: GET,
                    params: payload.params  
                }
            },
            providesTags: [FIXTURE_TAG],
        }),

        createFixture: builder.mutation<any, any>({
            query: ({payload}) => {
                return {
                    url: fixturesUrl,
                    method: POST,
                    body: payload,
                };
            },
            invalidatesTags: [FIXTURE_TAG]
        }),

        deleteFixture: builder.mutation<any, any>({
            query: ({ payload }) => {
                return {
                    url: `${fixturesUrl}/${payload._id}`,
                    method: DELETE,
                }
            },
            invalidatesTags: [FIXTURE_TAG],
        }),
    }),
});


export const {
    useLazyGetFixturesQuery, useCreateFixtureMutation, useDeleteFixtureMutation
} = fixtureApi;
