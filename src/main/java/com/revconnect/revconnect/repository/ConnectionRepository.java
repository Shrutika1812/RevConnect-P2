package com.revconnect.revconnect.repository;

import com.revconnect.revconnect.entity.Connection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    List<Connection> findByReceiverIdAndStatus(Long receiverId, String status);

    List<Connection> findBySenderIdAndStatus(Long senderId, String status);

    List<Connection> findBySenderIdOrReceiverId(Long senderId, Long receiverId);
}