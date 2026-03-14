package com.revconnect.revconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "business_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusinessProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String businessName;
    private String category;
    private String industry;
    
    @Column(length = 2000)
    private String bio;
    
    @Column(length = 500)
    private String businessAddress;
    
    private String phone;
    private String businessEmail;
    private String website;
    
    private String linkedin;
    private String twitter;
    private String instagram;
    private String facebook;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
