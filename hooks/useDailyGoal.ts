import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "../utils";
import { DailyGoal } from "../type/DailyGoal";

export function useDetailDailyGoal(id: string){
    return useQuery({
        queryKey: ["daily_goal",id],
        queryFn: ()=> handleFetch<DailyGoal>("/daily-goals/"+id,null,false,false)
    })
} 