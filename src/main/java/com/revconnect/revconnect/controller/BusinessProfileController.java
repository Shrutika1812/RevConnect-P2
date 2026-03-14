package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.BusinessProfile;
import com.revconnect.revconnect.service.BusinessProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/business-profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class BusinessProfileController {

    private final BusinessProfileService businessProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<BusinessProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(businessProfileService.getOrCreateProfile(userId));
    }

    @PutMapping("/{userId}/basic")
    public ResponseEntity<BusinessProfile> updateBasicInfo(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request) {
        
        return ResponseEntity.ok(businessProfileService.updateBasicInfo(
                userId,
                request.get("businessName"),
                request.get("category"),
                request.get("industry"),
                request.get("bio")
        ));
    }

    @PutMapping("/{userId}/contact")
    public ResponseEntity<BusinessProfile> updateContactInfo(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request) {
        
        return ResponseEntity.ok(businessProfileService.updateContactInfo(
                userId,
                request.get("businessAddress"),
                request.get("phone"),
                request.get("businessEmail"),
                request.get("website"),
                request.get("linkedin"),
                request.get("twitter"),
                request.get("instagram"),
                request.get("facebook")
        ));
    }
}
