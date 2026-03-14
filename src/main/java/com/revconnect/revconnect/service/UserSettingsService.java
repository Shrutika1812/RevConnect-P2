package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.entity.UserSettings;
import com.revconnect.revconnect.repository.UserRepository;
import com.revconnect.revconnect.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserSettingsService {

    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserSettings getOrCreateSettings(Long userId) {
        return userSettingsRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    
                    UserSettings settings = UserSettings.builder()
                            .user(user)
                            .isPublic(true)
                            .notifyConnectionRequests(true)
                            .notifyConnectionAccepted(true)
                            .notifyNewFollowers(true)
                            .notifyPostLikes(true)
                            .notifyPostComments(true)
                            .notifyPostShares(true)
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build();
                    
                    return userSettingsRepository.save(settings);
                });
    }

    public UserSettings updatePrivacy(Long userId, boolean isPublic) {
        UserSettings settings = getOrCreateSettings(userId);
        settings.setPublic(isPublic);
        settings.setUpdatedAt(LocalDateTime.now());
        return userSettingsRepository.save(settings);
    }

    public UserSettings updateNotificationPreferences(Long userId, 
            boolean connectionRequests, boolean connectionAccepted, 
            boolean newFollowers, boolean postLikes, 
            boolean postComments, boolean postShares) {
        
        UserSettings settings = getOrCreateSettings(userId);
        settings.setNotifyConnectionRequests(connectionRequests);
        settings.setNotifyConnectionAccepted(connectionAccepted);
        settings.setNotifyNewFollowers(newFollowers);
        settings.setNotifyPostLikes(postLikes);
        settings.setNotifyPostComments(postComments);
        settings.setNotifyPostShares(postShares);
        settings.setUpdatedAt(LocalDateTime.now());
        return userSettingsRepository.save(settings);
    }

    public void changePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void deleteAccount(Long userId) {
        userRepository.deleteById(userId);
    }
}
