/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:25 pm
 */


package com.bloodgram.donor.controller;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.request.FindDonorRequest;
import com.bloodgram.donor.dto.response.donor.AvailabeDonorsReponse;
import com.bloodgram.donor.dto.response.donor.DonorProfileResponse;
import com.bloodgram.donor.dto.response.donor.DonorRegisterResponse;
import com.bloodgram.donor.service.DonorService;
import com.bloodgram.donor.util.JwtUtil;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PermitAll
    public ResponseEntity<DonorRegisterResponse> registerDonor(@Valid @RequestBody DonorRegisterRequest request,
                                                               @RequestHeader("Authorization") String authHeader) {

        String email = jwtUtil.getUsernameFromToken(authHeader);
        DonorRegisterResponse response = donorService.registerDonor(request, email);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<DonorProfileResponse> getProfile(@RequestHeader("Authorization") String authHeader)
    {
        String email = jwtUtil.getUsernameFromToken(authHeader);

        DonorProfileResponse response = donorService.getProfile(email);

        return ResponseEntity
                .ok(response);
    }

    @PostMapping("/donors")
    @PermitAll
    public ResponseEntity<List<AvailabeDonorsReponse>> findAvailableDonors(
          @Valid  @RequestBody FindDonorRequest findDonorRequest
            ){

        List<AvailabeDonorsReponse> donors = donorService.findAvailableDonors(findDonorRequest);

        return ResponseEntity.ok(donors);
    }

    @GetMapping("/searchDonor")
    @PermitAll
    public ResponseEntity<DonorProfileResponse> findDonorByPhoneNumber(
            @RequestParam @NotBlank String phoneNumber
    )
    {
        DonorProfileResponse donor = donorService.findByPhoneNumber(phoneNumber);

        return ResponseEntity.ok(donor);
    }


}
