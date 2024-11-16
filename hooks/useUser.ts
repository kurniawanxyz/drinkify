import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "../utils";

export function useUser(){
    return useQuery({
        queryKey: ["user"],
        queryFn: () => handleFetch("/auths/details")
    })
}