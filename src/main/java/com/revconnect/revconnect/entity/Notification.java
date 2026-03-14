package com.revconnect.revconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;   // jis user ko notification milegi

    private String message;

    private String type; // LIKE, COMMENT, FOLLOW, CONNECTION

    private boolean isRead;

    private LocalDateTime createdAt;
}