package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);

    long countByPostId(Long postId);

    @Query("SELECT l FROM Like l JOIN FETCH l.user WHERE l.post.id = :postId")
    List<Like> findByPostIdWithUser(Long postId);
}