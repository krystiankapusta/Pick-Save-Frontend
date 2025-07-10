import { createContext, useContext } from 'react';

type SidebarContextType = {
    expanded: boolean;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
    undefined
);

export function useSidebarContext(): SidebarContextType {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error(
            'useSidebarContext must be used within a SidebarProvider'
        );
    }
    return context;
}
