import { useMutation, useQuery } from "@tanstack/react-query";
import { handleFetch } from "../utils";
import { DailyGoal } from "../type/DailyGoal";
import { queryClient } from "../libs";

export function useDetailDailyGoal(id: string){
    return useQuery({
        queryKey: ["daily_goal",id],
        queryFn: ()=> handleFetch<DailyGoal>("/daily-goals/"+id,null,false,false)
    })
} 

export function useDeleteWaterIntake(id: string){
    return useMutation({
        mutationKey: ["daily_goals",id],
        mutationFn: (idWaterIntakes: string)=> handleFetch("/water-intakes/"+idWaterIntakes,{method:"DELETE"}),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
            queryClient.invalidateQueries({
                queryKey: ["daily_goal",id]
            })
        }
    })
}