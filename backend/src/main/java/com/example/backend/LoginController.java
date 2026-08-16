package com.example.backend;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin(
        origins = "http://localhost:5174",
        allowCredentials = "true"
)
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    public LoginController(
            AuthenticationManager authenticationManager,
            SecurityContextRepository securityContextRepository) {

        this.authenticationManager = authenticationManager;
        this.securityContextRepository = securityContextRepository;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam String loginId,
            @RequestParam String password,
            HttpServletRequest request,
            HttpServletResponse response) {

        try {
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(loginId, password);

            Authentication authentication =
                    authenticationManager.authenticate(token);

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

            securityContextRepository.saveContext(
                    SecurityContextHolder.getContext(),
                    request,
                    response
            );

            return ResponseEntity.ok("ログイン成功");

        } catch (AuthenticationException e) {
            SecurityContextHolder.clearContext();

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("ログイン失敗");
        }
    }
}