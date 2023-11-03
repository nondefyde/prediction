import { useEffect } from "react";
import { MutationTrigger, LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useCreateFixtureMutation, useCreateTeamMutation, useDeleteFixtureMutation, useLazyGetFixturesQuery } from "@mpr/services/app";
import { usePagination } from "@mpr/hooks/_shared/usePagination";
import { Pagination } from "@mpr/_shared/namespace";

interface useFixtureProps {
    key?: string
    triggerKeys?: string[]
}

interface UseFixtureReturnType {
    getFixtures: LazyQueryTrigger<any>;
    getFixturesResponse: Record<string, any>;
    isLoadingFixtures: boolean;
    pagination: Pagination;
    isCreatingFixture:boolean;
    createFixture: MutationTrigger<any>;
    createFixtureResponse: Record<string, any>;
    deleteFixture: MutationTrigger<any>;
    deleteFixtureResponse: Record<string, any>;
}

export const useFixture = (props: useFixtureProps): UseFixtureReturnType => {
    const { triggerKeys } = props;
    const { paginate, pagination } = usePagination({ key: 'get-fixtures' });
    const [getFixtures, getFixturesResponse] = useLazyGetFixturesQuery();
    const [createFixture, createFixtureResponse] = useCreateFixtureMutation()
    const [deleteFixture, deleteFixtureResponse] = useDeleteFixtureMutation()

    const params = {
        ...paginate,
        // population: JSON.stringify(['teams']),
    };

    useEffect(() => {
        if (triggerKeys && triggerKeys.includes('get-fixtures')) {
            getFixtures({
                payload: {
                    params
                }
            });
        }
    }, [paginate]);

    const { isLoading } = getFixturesResponse;
    const {isLoading: isCreatingFixture} = createFixtureResponse

    return {
        getFixtures,
        isLoadingFixtures: isLoading,
        getFixturesResponse,
        isCreatingFixture,
        pagination,
        createFixture,
        createFixtureResponse,
        deleteFixture,
        deleteFixtureResponse
    };
};
