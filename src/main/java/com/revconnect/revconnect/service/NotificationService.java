package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Notification;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void create(User user, String message, String type) {

        // Check if similar notification exists in last 10 seconds (prevent duplicates)
        LocalDateTime tenSecondsAgo = LocalDateTime.now().minusSeconds(10);
        if (notificationRepository.findByUserIdAndMessageAndTypeAndCreatedAtAfter(
                user.getId(), message, type, tenSecondsAgo).isPresent()) {
            return; // Don't create duplicate
        }

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .type(type)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public List<Notification> getAll(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public long unreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public void markAsRead(Long id) {

        Notification notification = notificationRepository.findById(id).orElseThrow();

        notification.setRead(true);

        notificationRepository.save(notification);
    }

    public Notification getById(Long id) {
        return notificationRepository.findById(id).orElseThrow();
    }
}