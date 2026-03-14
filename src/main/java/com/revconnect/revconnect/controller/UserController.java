package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/search")
    public List<User> search(@RequestParam String keyword) {

        List<User> users = userRepository.findByUsernameContainingIgnoreCase(keyword);

        if (users.isEmpty()) {
            users = userRepository.findByEmailContainingIgnoreCase(keyword);
        }

        return users;
    }
}