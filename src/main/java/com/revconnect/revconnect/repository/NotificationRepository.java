package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    long countByUserIdAndIsReadFalse(Long userId);

    Optional<Notification> findByUserIdAndMessageAndTypeAndCreatedAtAfter(Long userId, String message, String type, LocalDateTime createdAt);
}