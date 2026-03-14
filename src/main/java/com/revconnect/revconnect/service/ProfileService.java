package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Profile;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.ProfileRepository;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public Profile createOrUpdateProfile(String email, Profile profileData) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUserId(user.getId());

        if (profile == null) {
            profile = new Profile();
            profile.setUser(user);
        }

        profile.setName(profileData.getName());
        profile.setBio(profileData.getBio());
        profile.setLocation(profileData.getLocation());
        profile.setWebsite(profileData.getWebsite());
        profile.setProfilePicture(profileData.getProfilePicture());

        return profileRepository.save(profile);
    }

    public Profile getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUserId(user.getId());
        
        if (profile == null) {
            profile = new Profile();
            profile.setUser(user);
        }
        
        return profile;
    }

    public void deleteMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUserId(user.getId());

        if (profile != null) {
            profileRepository.delete(profile);
        }
    }

    public Profile getUserProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user);
        
        if (profile == null) {
            profile = new Profile();
            profile.setUser(user);
        }
        
        return profile;
    }
    
    public com.revconnect.revconnect.dto.UserProfileDTO getUserProfileDTO(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user);
        
        if (profile == null) {
            profile = new Profile();
        }
        
        return com.revconnect.revconnect.dto.UserProfileDTO.builder()
                .id(profile.getId())
                .name(profile.getName())
                .bio(profile.getBio())
                .profilePicture(profile.getProfilePicture())
                .location(profile.getLocation())
                .website(profile.getWebsite())
                .user(com.revconnect.revconnect.dto.UserProfileDTO.UserBasicDTO.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .accountType(user.getAccountType() != null ? user.getAccountType().toString() : null)
                        .build())
                .build();
    }
}

