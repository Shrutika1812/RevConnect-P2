package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Follow;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.UserRepository;
import com.revconnect.revconnect.service.FollowService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;
    private final UserRepository userRepository;

    @PostMapping("/{userId}")
    public Follow follow(@PathVariable Long userId,
                         HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return followService.follow(email, userId);
    }

    @DeleteMapping("/{userId}")
    public String unfollow(@PathVariable Long userId,
                           HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        followService.unfollow(email, userId);

        return "Unfollowed";
    }

    @GetMapping("/followers")
    public List<Follow> followers(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        return followService.followers(user.getId());
    }

    @GetMapping("/following")
    public List<Follow> following(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        return followService.following(user.getId());
    }
}