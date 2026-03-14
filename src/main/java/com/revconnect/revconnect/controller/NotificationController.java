package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Notification;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.UserRepository;
import com.revconnect.revconnect.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public List<Notification> all(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        return notificationService.getAll(user.getId());
    }

    @GetMapping("/unread-count")
    public long unread(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        return notificationService.unreadCount(user.getId());
    }

    @PostMapping("/read/{id}")
    public Notification read(@PathVariable Long id) {

        notificationService.markAsRead(id);
        
        return notificationService.getById(id);
    }
}