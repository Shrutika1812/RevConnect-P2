package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Repost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepostRepository extends JpaRepository<Repost, Long> {

    long countByOriginalPostId(Long postId);

    Optional<Repost> findByUserIdAndOriginalPostId(Long userId, Long postId);

    @Query("SELECT r FROM Repost r JOIN FETCH r.originalPost p JOIN FETCH p.user WHERE r.user.id = :userId")
    List<Repost> findByUserId(Long userId);

}