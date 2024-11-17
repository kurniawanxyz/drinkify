import { useMutation, useQuery } from "@tanstack/react-query";
import { handleFetch } from "../utils";
import { ResponseJson } from "../type/ResponseJson";
import { User } from "../type/user";
import { queryClient } from "../libs";

export function useUser(){
    return useQuery({
        queryKey: ["user"],
        queryFn: () => handleFetch<User>("/auths/details",null,true,false)
    })
}

export function useAddTodayGoals()
{
    return useMutation({
        mutationKey: ["user"],
        mutationFn: (data:{goal_amount: number})=> handleFetch("/daily-goals",{method:"POST",data: data}),
        onSuccess: ()=> queryClient.invalidateQueries({queryKey:["user"]})
    })
}

export function useDeleteGoalToday()
{
    return useMutation({
        mutationKey: ["user"],
        mutationFn: (id: string)=> handleFetch("/daily-goals/"+id,{method:"DELETE"}),
        onSuccess: ()=> queryClient.invalidateQueries({queryKey:["user"]})
    })
}


export function useDeleteRemainder(){
    return useMutation({
        mutationKey: ["user"],
        mutationFn: (idWaterIntakes: string)=> handleFetch("/notifications/"+idWaterIntakes,{method:"DELETE"}),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        }
    })
}