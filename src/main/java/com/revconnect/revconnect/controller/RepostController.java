package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Repost;
import com.revconnect.revconnect.service.RepostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reposts")
@RequiredArgsConstructor
public class RepostController {

    private final RepostService repostService;

    @PostMapping("/{postId}")
    public Repost repost(@PathVariable Long postId,
                         HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return repostService.repost(email, postId);
    }
}