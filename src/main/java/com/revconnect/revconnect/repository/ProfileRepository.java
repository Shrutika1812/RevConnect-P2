package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Profile;
import com.revconnect.revconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByUserId(Long userId);

    Profile findByUser(User user);

}