package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.ScheduledPost;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.ScheduledPostRepository;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduledPostService {

    private final ScheduledPostRepository scheduledPostRepository;
    private final UserRepository userRepository;

    public ScheduledPost createScheduledPost(Long userId, String content, 
            String hashtags, LocalDateTime scheduledDateTime) {
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        ScheduledPost scheduledPost = ScheduledPost.builder()
                .user(user)
                .content(content)
                .hashtags(hashtags)
                .scheduledDateTime(scheduledDateTime)
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();
        
        return scheduledPostRepository.save(scheduledPost);
    }

    public List<ScheduledPost> getUserScheduledPosts(Long userId) {
        return scheduledPostRepository.findByUserIdOrderByScheduledDateTimeDesc(userId);
    }

    public void deleteScheduledPost(Long postId, Long userId) {
        ScheduledPost post = scheduledPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Scheduled post not found"));
        
        if (!post.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        
        scheduledPostRepository.delete(post);
    }
}
