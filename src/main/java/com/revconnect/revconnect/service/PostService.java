package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Post;
import com.revconnect.revconnect.entity.Repost;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.PostRepository;
import com.revconnect.revconnect.repository.UserRepository;
import com.revconnect.revconnect.repository.RepostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final com.revconnect.revconnect.repository.LikeRepository likeRepository;
    private final com.revconnect.revconnect.repository.CommentRepository commentRepository;
    private final RepostRepository repostRepository;

    public Post create(String email, Post data) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = Post.builder()
                .content(data.getContent())
                .hashtags(data.getHashtags())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        return postRepository.save(post);
    }

    public List<Post> feed(String email) {
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Post> posts = postRepository.findAllWithUserAndProfile().stream()
                .filter(post -> !post.getUser().getId().equals(currentUser.getId()))
                .toList();
        
        // Set like, comment counts and repost status
        posts.forEach(post -> {
            post.setLikeCount((int) likeRepository.countByPostId(post.getId()));
            post.setCommentCount((int) commentRepository.countByPostId(post.getId()));
            post.setIsReposted(repostRepository.findByUserIdAndOriginalPostId(currentUser.getId(), post.getId()).isPresent());
        });
        
        return posts;
    }

    public List<Post> myPosts(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get user's own posts
        List<Post> posts = postRepository.findByUserId(user.getId());
        
        // Get user's reposts
        List<Repost> reposts = repostRepository.findByUserId(user.getId());
        
        // Add reposted posts to the list
        reposts.forEach(repost -> {
            Post repostedPost = repost.getOriginalPost();
            repostedPost.setIsReposted(true);
            posts.add(repostedPost);
        });
        
        // Set like and comment counts
        posts.forEach(post -> {
            post.setLikeCount((int) likeRepository.countByPostId(post.getId()));
            post.setCommentCount((int) commentRepository.countByPostId(post.getId()));
        });
        
        // Sort by creation date (newest first)
        posts.sort((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()));
        
        return posts;
    }

    public Post update(Long id, Post data) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setContent(data.getContent());
        post.setHashtags(data.getHashtags());

        return postRepository.save(post);
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}