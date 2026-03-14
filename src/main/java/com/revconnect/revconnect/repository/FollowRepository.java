package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollowerId(Long followerId);

    List<Follow> findByFollowingId(Long followingId);

    @Transactional
    void deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);
}