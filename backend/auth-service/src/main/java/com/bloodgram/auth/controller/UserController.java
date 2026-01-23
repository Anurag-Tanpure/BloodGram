package com.bloodgram.auth.controller;

import com.bloodgram.auth.dto.request.LoginRequest;
import com.bloodgram.auth.dto.request.SignUpRequest;
import com.bloodgram.auth.service.AuthService;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    AuthService authService;

    @PostMapping("/signup")
    public String register(@RequestBody SignUpRequest signUpRequest)
    {
        return authService.registerUser(signUpRequest);
    }


    @PostMapping("/login")
     public String login(@RequestBody LoginRequest loginRequest)
     {
         return authService.login(loginRequest);
     }


    @GetMapping("/test")
    public String  test()
    {
        return "hello world";
    }

    @GetMapping("/jwttest")
    public String test2()
    {
        return "jwt filter workign";
    }
}
