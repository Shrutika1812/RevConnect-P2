package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);

    @Query("SELECT p FROM Post p JOIN FETCH p.user u LEFT JOIN FETCH u.profile")
    List<Post> findAllWithUserAndProfile();

}