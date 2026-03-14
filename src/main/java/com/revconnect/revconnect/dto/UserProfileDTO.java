package com.revconnect.revconnect.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private Long id;
    private String name;
    private String bio;
    private String profilePicture;
    private String location;
    private String website;
    private UserBasicDTO user;
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserBasicDTO {
        private Long id;
        private String username;
        private String email;
        private String accountType;
    }
}
