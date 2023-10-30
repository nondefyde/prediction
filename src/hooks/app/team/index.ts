import { useEffect } from "react";
import { MutationTrigger, LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useCreateTeamMutation, useLazyGetTeamsQuery } from "@mpr/services/app";
import { usePagination } from "@mpr/hooks/_shared/usePagination";

interface useTeamProps {
    key?: string
    triggerKeys?: string[]
}

interface UseTeamReturnType {
    getTeams: LazyQueryTrigger<any>;
    getTeamsResponse: Record<string, any>;
    isLoading: boolean;
    createTeam: MutationTrigger<any>;
    createTeamResponse: Record<string, any>;
    isCreatingTeam: boolean
}

export const useTeam = (props: useTeamProps): UseTeamReturnType => {
    const { triggerKeys } = props;
    const { paginate } = usePagination({ key: 'get-teams' });
    const [getTeams, getTeamsResponse] = useLazyGetTeamsQuery();
    const [createTeam, createTeamResponse] = useCreateTeamMutation();

    const params = {
        ...paginate,
        all:true
    };

    useEffect(() => {
        if (triggerKeys && triggerKeys.includes('get-teams')) {
            getTeams({
                payload: {
                    params
                }
            });
        }
    }, []);

    const { isLoading } = getTeamsResponse;
    const {isLoading: isCreatingTeam} = createTeamResponse


    return {
        getTeams,
        isLoading,
        getTeamsResponse,
        createTeam,
        createTeamResponse,
        isCreatingTeam
    };
};
