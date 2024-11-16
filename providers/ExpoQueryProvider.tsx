import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "../libs";

export function ExpoQueryProvider({children}: {children: ReactNode}) {
    return (
        <QueryClientProvider
            client={queryClient}
        >
            {children}
        </QueryClientProvider>
    )
}