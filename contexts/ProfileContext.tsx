import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, createEmptyProfile } from '../models/UserProfile';
import { ProfileStorage } from '../services/ProfileStorage';

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => Promise<void>;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps): React.JSX.Element {
  const [profile, setProfile] = useState<UserProfile>(createEmptyProfile());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    const savedProfile = await ProfileStorage.load();
    if (savedProfile) {
      setProfile(savedProfile);
    }
    setIsLoading(false);
  };

  const updateProfile = async (newProfile: UserProfile) => {
    setProfile(newProfile);
    await ProfileStorage.save(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
