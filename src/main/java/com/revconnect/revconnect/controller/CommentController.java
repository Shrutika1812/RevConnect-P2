package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Comment;
import com.revconnect.revconnect.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{postId}")
    public Comment add(@PathVariable Long postId,
                       @RequestBody java.util.Map<String, String> body,
                       HttpServletRequest request) {

        String email = (String) request.getAttribute("email");
        String content = body.get("content");

        return commentService.addComment(email, postId, content);
    }

    @GetMapping("/{postId}")
    public List<Comment> get(@PathVariable Long postId) {
        return commentService.getComments(postId);
    }

    @DeleteMapping("/{commentId}")
    public String delete(@PathVariable Long commentId) {

        commentService.deleteComment(commentId);

        return "Comment deleted";
    }
}