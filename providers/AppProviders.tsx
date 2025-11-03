import React, { ReactNode } from 'react';
import { ProfileProvider } from '../contexts/ProfileContext';
import { RankingProvider } from '../contexts/RankingContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Composes all app-level context providers
 * This prevents "provider hell" by centralizing all providers in one place
 */
export function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
  return (
    <ProfileProvider>
      <RankingProvider>
        {children}
      </RankingProvider>
    </ProfileProvider>
  );
}
