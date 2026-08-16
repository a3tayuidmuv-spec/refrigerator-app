package com.example.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin(
        origins = "http://localhost:5174",
        allowCredentials = "true"
)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{loginId}")
    @ResponseBody
    public User getUser(@PathVariable String loginId) {
        return userService.findByLoginId(loginId);
    }
}