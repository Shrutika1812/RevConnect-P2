package com.revconnect.revconnect.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reposts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Repost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post originalPost;
}