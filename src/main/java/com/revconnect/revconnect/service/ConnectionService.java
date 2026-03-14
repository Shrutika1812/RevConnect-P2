package com.revconnect.revconnect.service;

import com.revconnect.revconnect.entity.Connection;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.ConnectionRepository;
import com.revconnect.revconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public Connection sendRequest(String email, Long receiverId) {

        User sender = userRepository.findByEmail(email).orElseThrow();
        User receiver = userRepository.findById(receiverId).orElseThrow();

        Connection connection = Connection.builder()
                .sender(sender)
                .receiver(receiver)
                .status("PENDING")
                .build();

        Connection saved = connectionRepository.save(connection);

        // 🔔 Notification
        notificationService.create(
                receiver,
                sender.getUsername() + " sent you a connection request",
                "CONNECTION_REQUEST"
        );

        return saved;
    }

    public Connection accept(Long requestId) {

        Connection connection = connectionRepository.findById(requestId).orElseThrow();

        connection.setStatus("ACCEPTED");

        Connection saved = connectionRepository.save(connection);

        // 🔔 Notification
        notificationService.create(
                connection.getSender(),
                connection.getReceiver().getUsername() + " accepted your request",
                "CONNECTION_ACCEPT"
        );

        return saved;
    }

    public Connection reject(Long requestId) {

        Connection connection = connectionRepository.findById(requestId).orElseThrow();

        connection.setStatus("REJECTED");

        return connectionRepository.save(connection);
    }

    public List<Connection> pending(Long userId) {
        return connectionRepository.findByReceiverIdAndStatus(userId, "PENDING");
    }

    public List<Connection> myConnections(Long userId) {
        return connectionRepository.findBySenderIdOrReceiverId(userId, userId);
    }

    public void remove(Long id) {
        connectionRepository.deleteById(id);
    }
}