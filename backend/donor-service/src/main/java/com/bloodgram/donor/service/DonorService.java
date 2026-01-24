/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:13 pm
 */


package com.bloodgram.donor.service;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.external.AuthClient;
import com.bloodgram.donor.repository.DonorRepo;
import com.bloodgram.donor.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DonorService {

    private final  DonorRepo  donorRepo;
    private final UserRepo userRepo;
    private final AuthClient authClient;

    public DonorService(DonorRepo donorRepo, UserRepo userRepo, AuthClient authClient) {
        this.donorRepo = donorRepo;
        this.userRepo = userRepo;
        this.authClient = authClient;
    }


    @Transactional
    public Donor registerDonor(DonorRegisterRequest request,String email)
    {

        if (donorRepo.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone already registered");
        }

        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email))
                .getId();

        if (donorRepo.existsByUserId(userId)) {
            throw new IllegalArgumentException("User already has donor profile");
        }

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

        Donor savedDonor = donorRepo.save(donor);

        authClient.addDonorRole(email);

        return savedDonor;

    }

}
