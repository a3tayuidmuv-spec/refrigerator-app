package com.example.backend;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByLoginId(String loginId) {
        return userRepository.findById(loginId).orElse(null);
    }

    public boolean login(String loginId, String password) {
        User user = userRepository.findById(loginId).orElse(null);

        if (user == null) {
            return false;
        }

        return user.getPassword().equals(password);
    }
}