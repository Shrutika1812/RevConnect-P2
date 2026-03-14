package com.revconnect.revconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean isPublic = true;
    private boolean notifyConnectionRequests = true;
    private boolean notifyConnectionAccepted = true;
    private boolean notifyNewFollowers = true;
    private boolean notifyPostLikes = true;
    private boolean notifyPostComments = true;
    private boolean notifyPostShares = true;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
