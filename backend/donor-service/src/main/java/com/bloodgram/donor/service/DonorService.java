/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:13 pm
 */


package com.bloodgram.donor.service;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.request.FindDonorRequest;
import com.bloodgram.donor.dto.response.donor.AvailabeDonorsReponse;
import com.bloodgram.donor.dto.response.donor.DonorProfileResponse;
import com.bloodgram.donor.dto.response.donor.DonorRegisterResponse;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.exception.BadRequestException;
import com.bloodgram.donor.exception.ResourceNotFoundException;
import com.bloodgram.donor.external.AuthClient;
import com.bloodgram.donor.mapper.DonorMapper;
import com.bloodgram.donor.repository.DonorRepo;
import com.bloodgram.donor.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
            throw new BadRequestException("Phone number already registered");
        }

        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email:"+email))
                .getId();

        if (donorRepo.existsByUserId(userId)) {
            throw new BadRequestException("User already has donor profile");
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

    @Transactional
    public DonorProfileResponse getProfile(String email)
    {
        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with email:"+email))
                .getId();

        Donor donor = donorRepo.findByUserId(userId)
                .orElseThrow(()->new ResourceNotFoundException("Donor not found with email:"+email));

        return donorMapper.donorToDonorProfileResponse(donor);

    }

    public List<AvailabeDonorsReponse> findAvailableDonors(FindDonorRequest request) {

        List<Donor> donors = donorRepo.findByBloodGroupAndCityAndStateAndCountryAndIsAvailableTrue(
                request.getBloodGroup(),
                request.getCity(),
                request.getState(),
                request.getCountry()
        );

        return donors.stream()
                .map(donorMapper::donorToAvailabeDonorsResponse)
                .toList();
    }
     public DonorProfileResponse findByPhoneNumber(String phoneNumber)
     {
         return donorMapper.donorToDonorProfileResponse(
                 donorRepo.findByPhoneNumber(phoneNumber)
                         .orElseThrow(()->
                                 new ResourceNotFoundException("Donor not registered with phoneNnumber:"+phoneNumber))
         );
     }



}
