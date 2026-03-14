package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.ScheduledPost;
import com.revconnect.revconnect.service.ScheduledPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scheduled-posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ScheduledPostController {

    private final ScheduledPostService scheduledPostService;

    @PostMapping
    public ResponseEntity<ScheduledPost> createScheduledPost(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        String content = (String) request.get("content");
        String hashtags = (String) request.get("hashtags");
        String scheduledDateTime = (String) request.get("scheduledDateTime");
        
        ScheduledPost post = scheduledPostService.createScheduledPost(
                userId, content, hashtags, LocalDateTime.parse(scheduledDateTime));
        
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScheduledPost>> getUserScheduledPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(scheduledPostService.getUserScheduledPosts(userId));
    }

    @DeleteMapping("/{postId}/user/{userId}")
    public ResponseEntity<Map<String, String>> deleteScheduledPost(
            @PathVariable Long postId,
            @PathVariable Long userId) {
        
        scheduledPostService.deleteScheduledPost(postId, userId);
        return ResponseEntity.ok(Map.of("message", "Scheduled post deleted"));
    }
}
