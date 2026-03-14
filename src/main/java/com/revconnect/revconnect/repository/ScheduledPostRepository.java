package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.ScheduledPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduledPostRepository extends JpaRepository<ScheduledPost, Long> {
    List<ScheduledPost> findByUserIdOrderByScheduledDateTimeDesc(Long userId);
}
