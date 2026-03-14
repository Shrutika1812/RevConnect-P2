package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Like;
import com.revconnect.revconnect.repository.LikeRepository;
import com.revconnect.revconnect.service.LikeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeRepository likeRepository;
    private final LikeService likeService;

    @PostMapping("/{postId}")
    public void like(@PathVariable Long postId,
                     HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        likeService.like(email, postId);
    }

    @DeleteMapping("/{postId}")
    public void unlike(@PathVariable Long postId,
                       HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        likeService.unlike(email, postId);
    }

    @GetMapping("/post/{postId}")
    public List<Map<String, Object>> getLikesByPost(@PathVariable Long postId) {
        List<Like> likes = likeRepository.findByPostIdWithUser(postId);
        return likes.stream()
                .map(like -> {
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("id", like.getId());
                    map.put("username", like.getUser().getUsername());
                    map.put("email", like.getUser().getEmail());
                    return map;
                })
                .collect(Collectors.toList());
    }
}
