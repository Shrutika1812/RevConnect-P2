package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.SecurityQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecurityQuestionRepository extends JpaRepository<SecurityQuestion, Long> {
    Optional<SecurityQuestion> findByUserId(Long userId);
}
