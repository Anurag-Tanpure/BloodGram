/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:13 pm
 */


package com.bloodgram.donor.service;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.repository.DonorRepo;
import com.bloodgram.donor.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DonorService {

    private final  DonorRepo  donorRepo;
    private final UserRepo userRepo;

    public DonorService(DonorRepo donorRepo, UserRepo userRepo) {
        this.donorRepo = donorRepo;
        this.userRepo = userRepo;
    }


    public Donor registerDonor(DonorRegisterRequest request,String email)
    {

        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email))
                .getId();

        Donor donor = Donor.builder()
                .userId(userId)
                .bloodGroup(request.getBloodGroup())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .phoneNumber(request.getPhoneNumber())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .weight(request.getWeight())
                .imageUrl(request.getImageUrl())
                .donationCount(0)
                .lastDonationDate(null)
                .isAvailable(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return donor;
    }

}
