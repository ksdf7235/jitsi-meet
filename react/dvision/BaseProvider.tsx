import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProtectedPageProps {
    children: React.ReactNode;
}

function BaseProvider({ children }: IProtectedPageProps) {
    const client = new QueryClient();

    return (
        <>
            <QueryClientProvider client={client}>
                <ChakraProvider>
                    <RecoilRoot>{children}</RecoilRoot>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
}

export default BaseProvider;
