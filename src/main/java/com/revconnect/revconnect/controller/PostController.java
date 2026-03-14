package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Post;
import com.revconnect.revconnect.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public Post create(@RequestBody Post post,
                       HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return postService.create(email, post);
    }

    @GetMapping("/feed")
    public List<Post> feed(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return postService.feed(email);
    }

    @GetMapping("/my")
    public List<Post> myPosts(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        if (email == null) {
            throw new RuntimeException("User not authenticated");
        }

        return postService.myPosts(email);
    }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id,
                       @RequestBody Post post) {

        return postService.update(id, post);
    }

    @DeleteMapping("/{id}")
    public java.util.Map<String, String> delete(@PathVariable Long id) {

        postService.delete(id);

        return java.util.Map.of("message", "Post deleted successfully");
    }
}