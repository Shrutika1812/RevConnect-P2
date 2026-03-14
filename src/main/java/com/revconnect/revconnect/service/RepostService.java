package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Post;
import com.revconnect.revconnect.entity.Repost;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.PostRepository;
import com.revconnect.revconnect.repository.RepostRepository;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RepostService {

    private final RepostRepository repostRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public Repost repost(String email, Long postId) {

        User user = userRepository.findByEmail(email).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();

        // Check if already reposted
        if (repostRepository.findByUserIdAndOriginalPostId(user.getId(), postId).isPresent()) {
            throw new RuntimeException("Already reposted");
        }

        Repost repost = Repost.builder()
                .user(user)
                .originalPost(post)
                .createdAt(LocalDateTime.now())
                .build();

        return repostRepository.save(repost);
    }
}