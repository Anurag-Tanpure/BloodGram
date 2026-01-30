/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 10:44 pm
 */


package com.bloodgram.donor.controller;

import com.bloodgram.donor.dto.request.DonationRequestCreateDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestResponseDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestResponseListDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestUserListResponsedto;
import com.bloodgram.donor.service.DonationRequestService;
import com.bloodgram.donor.util.JwtUtil;
import jakarta.annotation.security.PermitAll;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("donor/donationRequests")
public class DonationRequestController {


    private final JwtUtil jwtUtil;
    private final DonationRequestService donationRequestService;

    public DonationRequestController(JwtUtil jwtUtil, DonationRequestService donationRequestService) {
        this.jwtUtil = jwtUtil;
        this.donationRequestService = donationRequestService;
    }

    @PostMapping("create")
    @PermitAll@PreAuthorize("hasRole('USER')")
    public ResponseEntity<DonationRequestResponseDto> createRequest(
            @RequestBody DonationRequestCreateDto request,
            @RequestHeader("Authorization") String authHeader)
    {
        String email = jwtUtil.getUsernameFromToken(authHeader);

        DonationRequestResponseDto response =  donationRequestService
                .create(email,request.getUserPhone(),request.getDonorId());

        return ResponseEntity.ok(response);

    }

    @GetMapping("/receivedRequests")
    @PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<List<DonationRequestResponseListDto>> receivedRequests(
            @RequestHeader("Authorization") String authHeader)
    {
        String email = jwtUtil.getUsernameFromToken(authHeader);


    List<DonationRequestResponseListDto> list  = donationRequestService.getReceivedRequests(email);

    return ResponseEntity
            .ok(list);

    }

    @GetMapping("/sentRequests")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<DonationRequestUserListResponsedto>> sentReuqests(
           @RequestHeader("Authorization") String authHeader
    )
    {
       String email = jwtUtil.getUsernameFromToken(authHeader);
       List<DonationRequestUserListResponsedto> list = donationRequestService.getSendRequets(email);

       return ResponseEntity
               .ok(list);
    }

}
