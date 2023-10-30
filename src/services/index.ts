import { FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryApi, QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {  APP_BASE_URL } from "@mpr/_shared/constant";
import tagTypes from "@mpr/services/app/tags";
import { HYDRATE } from "next-redux-wrapper";


const baseQuery = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-API-KEY', process.env.NEXT_PUBLIC_APP_API_KEY as string);
            return headers;
        },
    });

/**change the returned data**/
export const baseQueryWithResponse =
    (baseUrl: string) =>
        async (args: FetchArgs, api: BaseQueryApi, extraOptions: Record<string, any>) => {
            const {
                data,
                error,
            }: QueryReturnValue<any, any, Record<string, any>> = await baseQuery(baseUrl)(
                args,
                api,
                extraOptions
            );
            if (error) {
                return { error: { status: error?.status, data: error?.data } };
            }
            return { data };
        };

export const api = createApi({
    reducerPath: 'user_api',
    baseQuery: baseQueryWithResponse(APP_BASE_URL),
    tagTypes,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: () => ({}),
});


