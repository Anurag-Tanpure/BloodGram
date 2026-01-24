/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 02:11 pm
 */


package com.bloodgram.auth.controller;

import com.bloodgram.auth.service.AuthService;
import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/internal")
public class InternalController {

    private final AuthService authService;


    public InternalController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/add-donor-role")
    @PermitAll
    public void addDonorRole(@RequestParam String email)
    {
          authService.addDonorRole(email);
    }

}
