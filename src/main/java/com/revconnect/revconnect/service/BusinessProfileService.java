package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.*;
import com.revconnect.revconnect.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessProfileService {

    private final BusinessProfileRepository businessProfileRepository;
    private final UserRepository userRepository;

    public BusinessProfile getOrCreateProfile(Long userId) {
        return businessProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    
                    BusinessProfile profile = BusinessProfile.builder()
                            .user(user)
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build();
                    
                    return businessProfileRepository.save(profile);
                });
    }

    public BusinessProfile updateBasicInfo(Long userId, String businessName, 
            String category, String industry, String bio) {
        
        BusinessProfile profile = getOrCreateProfile(userId);
        profile.setBusinessName(businessName);
        profile.setCategory(category);
        profile.setIndustry(industry);
        profile.setBio(bio);
        profile.setUpdatedAt(LocalDateTime.now());
        return businessProfileRepository.save(profile);
    }

    public BusinessProfile updateContactInfo(Long userId, String businessAddress, 
            String phone, String businessEmail, String website, 
            String linkedin, String twitter, String instagram, String facebook) {
        
        BusinessProfile profile = getOrCreateProfile(userId);
        profile.setBusinessAddress(businessAddress);
        profile.setPhone(phone);
        profile.setBusinessEmail(businessEmail);
        profile.setWebsite(website);
        profile.setLinkedin(linkedin);
        profile.setTwitter(twitter);
        profile.setInstagram(instagram);
        profile.setFacebook(facebook);
        profile.setUpdatedAt(LocalDateTime.now());
        return businessProfileRepository.save(profile);
    }
}
