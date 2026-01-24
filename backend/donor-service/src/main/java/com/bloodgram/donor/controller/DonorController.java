/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:25 pm
 */


package com.bloodgram.donor.controller;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.response.DonorRegisterResponse;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.service.DonorService;
import com.bloodgram.donor.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<DonorRegisterResponse> registerDonor(@RequestBody DonorRegisterRequest request,
                                        @RequestHeader("Authorization") String authHeader){

        String token = authHeader.substring(7);

        String email = jwtUtil.getUsernameFromToken(token);

        DonorRegisterResponse response =  donorService.registerDonor(request,email);

        return  ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

}
