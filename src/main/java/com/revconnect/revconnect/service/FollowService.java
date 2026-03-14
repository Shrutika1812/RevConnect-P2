package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Follow;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.FollowRepository;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public Follow follow(String email, Long userId) {

        User follower = userRepository.findByEmail(email).orElseThrow();
        User following = userRepository.findById(userId).orElseThrow();

        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();

        Follow saved = followRepository.save(follow);

        // 🔔 Notification
        notificationService.create(
                following,
                follower.getUsername() + " started following you",
                "FOLLOW"
        );

        return saved;
    }

    public void unfollow(String email, Long userId) {

        User follower = userRepository.findByEmail(email).orElseThrow();

        followRepository.deleteByFollowerIdAndFollowingId(
                follower.getId(), userId);
    }

    public List<Follow> followers(Long userId) {
        return followRepository.findByFollowingId(userId);
    }

    public List<Follow> following(Long userId) {
        return followRepository.findByFollowerId(userId);
    }
}