import {GET, POST, teamsUrl} from "@mpr/_shared/constant";
import {api} from "@mpr/services";
import {TEAM_TAG} from "@mpr/services/app/tags";

export const teamApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query<any, any>({
            query: () => {
                return {
                    url: teamsUrl,
                    method: GET,
                }
            },
            providesTags: [TEAM_TAG],
        }),

        createTeam: builder.mutation<any, any>({
            query: ({payload}) => {
                return {
                    url: teamsUrl,
                    method: POST,
                    body: payload,
                };
            },
            invalidatesTags: [TEAM_TAG]
        }),
    }),
});


export const {
    useLazyGetTeamsQuery, useCreateTeamMutation
} = teamApi;
