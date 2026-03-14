package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Profile;
import com.revconnect.revconnect.service.ProfileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping
    public Profile createOrUpdate(@RequestBody Profile profile,
                                  HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return profileService.createOrUpdateProfile(email, profile);
    }

    @GetMapping("/me")
    public Profile myProfile(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return profileService.getMyProfile(email);
    }

    @DeleteMapping
    public String deleteProfile(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        profileService.deleteMyProfile(email);

        return "Profile deleted successfully";
    }

    @GetMapping("/user/{id}")
    public com.revconnect.revconnect.dto.UserProfileDTO getUserProfile(@PathVariable Long id) {
        return profileService.getUserProfileDTO(id);
    }

}