import { profileService } from "../../services/profile.service";

export const getCurrentProfile = async (userId) => {
  return profileService.getProfile(userId);
};

export const updateCurrentProfile = async (userId, updates) => {
  return profileService.updateProfile(userId, updates);
};
