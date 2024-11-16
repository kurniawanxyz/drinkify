import { useMutation } from "@tanstack/react-query";
import { handleFetch } from "../utils";
import { queryClient } from "../libs";

export function useAddWaterIntake(id: string){
    return useMutation({
        mutationKey: ["daily_goal", id],
        mutationFn: (data:{
            amount: number
        })=> handleFetch("/water-intakes/",{
            method: "POST",
            data,
        }),
        onSuccess: async()=> {
            await queryClient.invalidateQueries({
                queryKey: ["daily_goal",id],
            })
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            })
        }
    })
}