package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Like;
import com.revconnect.revconnect.entity.Post;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.LikeRepository;
import com.revconnect.revconnect.repository.PostRepository;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public void like(String email, Long postId) {

        User user = userRepository.findByEmail(email).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();

        if (likeRepository.findByUserIdAndPostId(user.getId(), postId).isEmpty()) {

            Like like = Like.builder()
                    .user(user)
                    .post(post)
                    .build();

            likeRepository.save(like);
        }
    }

    public void unlike(String email, Long postId) {

        User user = userRepository.findByEmail(email).orElseThrow();

        likeRepository.findByUserIdAndPostId(user.getId(), postId)
                .ifPresent(likeRepository::delete);
    }
}