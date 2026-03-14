package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.UserSettings;
import com.revconnect.revconnect.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SettingsController {

    private final UserSettingsService userSettingsService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserSettings> getSettings(@PathVariable Long userId) {
        return ResponseEntity.ok(userSettingsService.getOrCreateSettings(userId));
    }

    @PutMapping("/{userId}/privacy")
    public ResponseEntity<UserSettings> updatePrivacy(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> request) {
        
        boolean isPublic = request.get("isPublic");
        return ResponseEntity.ok(userSettingsService.updatePrivacy(userId, isPublic));
    }

    @PutMapping("/{userId}/notifications")
    public ResponseEntity<UserSettings> updateNotifications(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> preferences) {
        
        return ResponseEntity.ok(userSettingsService.updateNotificationPreferences(
                userId,
                preferences.getOrDefault("connectionRequests", true),
                preferences.getOrDefault("connectionAccepted", true),
                preferences.getOrDefault("newFollowers", true),
                preferences.getOrDefault("postLikes", true),
                preferences.getOrDefault("postComments", true),
                preferences.getOrDefault("postShares", true)
        ));
    }

    @PostMapping("/{userId}/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request) {
        
        try {
            String currentPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");
            
            userSettingsService.changePassword(userId, currentPassword, newPassword);
            return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, String>> deleteAccount(@PathVariable Long userId) {
        userSettingsService.deleteAccount(userId);
        return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
    }
}
