package com.bloodgram.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class TestController {

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/profile")
    public String userProfile() {
        return "User profile data";
    }

    @PreAuthorize("hasRole('BLOODBANK')")
    @GetMapping("/stock")
    public String viewStock() {
        return "Blood stock data";
    }

    @PreAuthorize("hasRole('DONOR')")
    @GetMapping("/donate")
    public String donateBlood() {
        return "Blood donated successfully";
    }



}
