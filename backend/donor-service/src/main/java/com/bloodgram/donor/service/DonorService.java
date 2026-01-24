/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:13 pm
 */


package com.bloodgram.donor.service;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.response.DonorRegisterResponse;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.external.AuthClient;
import com.bloodgram.donor.mapper.DonorMapper;
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
    private final DonorMapper donorMapper;

    public DonorService(DonorRepo donorRepo, UserRepo userRepo, AuthClient authClient, DonorMapper donorMapper) {
        this.donorRepo = donorRepo;
        this.userRepo = userRepo;
        this.authClient = authClient;
        this.donorMapper = donorMapper;
    }


    @Transactional
    public DonorRegisterResponse registerDonor(DonorRegisterRequest request,String email)
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


      Donor donor = donorMapper.donorRegisterRequestToDonor(request);

        donor.setUserId(userId);
        donor.setDonationCount(0);
        donor.setIsAvailable(true);
        donor.setCreatedAt(LocalDateTime.now());
        donor.setUpdatedAt(LocalDateTime.now());


        Donor savedDonor = donorRepo.save(donor);


        authClient.addDonorRole(email);

        DonorRegisterResponse response = donorMapper.donorToDonorRegisterResponse(donor);

        return response;

    }

}
