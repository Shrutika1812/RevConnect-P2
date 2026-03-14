package com.revconnect.revconnect.controller;

import com.revconnect.revconnect.entity.Connection;
import com.revconnect.revconnect.entity.User;
import com.revconnect.revconnect.repository.UserRepository;
import com.revconnect.revconnect.service.ConnectionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;
    private final UserRepository userRepository;

    @PostMapping("/request/{userId}")
    public Connection request(@PathVariable Long userId,
                              HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return connectionService.sendRequest(email, userId);
    }

    @PostMapping("/accept/{id}")
    public Connection accept(@PathVariable Long id) {
        return connectionService.accept(id);
    }

    @PostMapping("/reject/{id}")
    public Connection reject(@PathVariable Long id) {
        return connectionService.reject(id);
    }

    @GetMapping("/pending")
    public List<Connection> pending(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        return connectionService.pending(user.getId());
    }

    @GetMapping("/my")
    public List<Connection> my(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        User user = userRepository.findByEmail(email).orElseThrow();

        return connectionService.myConnections(user.getId());
    }

    @DeleteMapping("/{id}")
    public String remove(@PathVariable Long id) {

        connectionService.remove(id);

        return "Connection removed";
    }
}