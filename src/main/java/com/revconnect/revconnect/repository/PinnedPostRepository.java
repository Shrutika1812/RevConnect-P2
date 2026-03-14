package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.PinnedPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PinnedPostRepository extends JpaRepository<PinnedPost, Long> {
    List<PinnedPost> findByUserIdOrderByPinnedAtDesc(Long userId);
    Optional<PinnedPost> findByUserIdAndPostId(Long userId, Long postId);
    long countByUserId(Long userId);
}
