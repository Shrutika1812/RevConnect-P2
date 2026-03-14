package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.PostView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostViewRepository extends JpaRepository<PostView, Long> {
    @Query("SELECT COUNT(DISTINCT pv.user.id) FROM PostView pv WHERE pv.post.id = :postId")
    long countUniqueViewsByPostId(Long postId);
}
