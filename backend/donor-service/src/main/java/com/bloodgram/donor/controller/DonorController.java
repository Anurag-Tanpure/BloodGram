/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:25 pm
 */


package com.bloodgram.donor.controller;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.response.DonorProfileResponse;
import com.bloodgram.donor.dto.response.DonorRegisterResponse;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.service.DonorService;
import com.bloodgram.donor.util.JwtUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donor")
public class DonorController {

    private final DonorService donorService;
    private final JwtUtil jwtUtil;

    public DonorController(DonorService donorService, com.bloodgram.donor.util.JwtUtil jwtUtil) {
        this.donorService = donorService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/register")
    public ResponseEntity<DonorRegisterResponse> registerDonor(@Valid @RequestBody DonorRegisterRequest request,
                                                               @RequestHeader("Authorization") String authHeader) {

        if (!authHeader.startsWith("Bearer ")) {
            throw new JwtException("Invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.getUsernameFromToken(token);
        DonorRegisterResponse response = donorService.registerDonor(request, email);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<DonorProfileResponse> getProfile(@RequestHeader("Authorization") String authHeader)
    {
        if (!authHeader.startsWith("Bearer ")) {
            throw new JwtException("Invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.getUsernameFromToken(token);

        DonorProfileResponse response = donorService.getProfile(email);

        return ResponseEntity
                .ok(response);
    }



}
