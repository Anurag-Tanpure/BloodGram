/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 10:29 pm
 */


package com.bloodgram.donor.service;

import com.bloodgram.donor.dto.response.donationRequest.DonationRequestResponseDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestResponseListDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestUserListResponsedto;
import com.bloodgram.donor.entity.DonationRequest;
import com.bloodgram.donor.entity.Donor;
import com.bloodgram.donor.entity.enums.RequestStatus;
import com.bloodgram.donor.exception.AccessDeniedException;
import com.bloodgram.donor.exception.BadRequestException;
import com.bloodgram.donor.exception.ResourceNotFoundException;
import com.bloodgram.donor.mapper.DonationRequestMapper;
import com.bloodgram.donor.repository.DonationRequestRepo;
import com.bloodgram.donor.repository.DonorRepo;
import com.bloodgram.donor.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.bloodgram.donor.entity.enums.RequestStatus.*;

@Service
public class DonationRequestService {

    private final DonationRequestRepo donationRequestRepo;
    private final DonorRepo donorRepo;
    private final UserRepo userRepo;
    private final DonationRequestMapper donationRequestMapper;


    public DonationRequestService(DonationRequestRepo donationRequestRepo, DonorRepo donorRepo, UserRepo userRepo, DonationRequestMapper donationRequestMapper) {
        this.donationRequestRepo = donationRequestRepo;
        this.donorRepo = donorRepo;
        this.userRepo = userRepo;
        this.donationRequestMapper = donationRequestMapper;
    }


    @Transactional
    public DonationRequestResponseDto create(String email, String userPhone, Long donorId) {

        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user not found with email:" + email))
                .getId();

        if(donorId==userId)
            throw new BadRequestException("you can not create request for your own");

        if(donationRequestRepo.existsByReceiverIdAndDonorIdAndStatus(userId,donorId,PENDING))
            throw new RuntimeException("Already requested");


        String donorPhone = donorRepo.findByDonorId(donorId)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found"))
                .getPhoneNumber();

        DonationRequest request = DonationRequest.builder()
                .donorId(donorId)
                .receiverId(userId)
                .status(PENDING)
                .userPhone(userPhone)
                .donorPhone(donorPhone)
                .requestDate(LocalDateTime.now())
                .expiryDate(LocalDateTime.now().plusDays(10))
                .build();

        DonationRequest donationRequest = donationRequestRepo.save(request);

        return DonationRequestResponseDto.builder()
                .donorId(donationRequest.getDonorId())
                .receiverId(donationRequest.getReceiverId())
                .status(donationRequest.getStatus())
                .requestDate(donationRequest.getRequestDate())
                .build();

    }

    @Transactional
    public List<DonationRequestResponseListDto> getReceivedRequests(String email) {
        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user not found with email:" + email))
                .getId();

        Long donorId = donorRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User is not donor"))
                .getDonorId();

        List<DonationRequest> list = donationRequestRepo.findByDonorIdAndExpiryDateAfter(
                donorId,LocalDateTime.now())
                .orElse(List.of());

        return list.stream()
                .map(donationRequestMapper::donationRequestToDonationRequestResponseListDto)
                .toList();
    }

    @Transactional
    public List<DonationRequestUserListResponsedto> getSendRequets(String email)
    {
        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user not found with email:" + email))
                .getId();

        List<DonationRequest> list = donationRequestRepo.findByReceiverIdAndExpiryDateAfter(
                        userId,LocalDateTime.now())
                .orElse(List.of());

        return list.stream()
                .map(req->{

                    Donor donor = donorRepo.findByDonorId(req.getDonorId())
                            .orElseThrow();

                   String phone="Not allowed";

                   if(req.getStatus()==RequestStatus.ACCEPTED)
                       phone=donor.getPhoneNumber();

                    return DonationRequestUserListResponsedto.builder()
                            .id(req.getId())
                            .donorId(req.getDonorId())
                            .bloodGroup(donor.getBloodGroup())
                            .city(donor.getCity())
                            .donorPhone(phone)
                            .donorname(donor.getName())
                            .status(req.getStatus())
                            .requestDate(req.getRequestDate())
                            .build();
                        }
                )
                .toList();

    }


    public DonationRequestResponseDto accept(Long id,String email)
    {
        DonationRequest request = donationRequestRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Request Not found"));
        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user not found with email:" + email))
                .getId();

        Long donorId = donorRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User is not donor"))
                .getDonorId();

            if(!request.getDonorId().equals(donorId))
            {
                throw new AccessDeniedException("This is not your request");
            }

            request.setStatus(ACCEPTED);

            donationRequestRepo.save(request);

            return  donationRequestMapper.donationRequestToDonationRequestResponsedto(request);

    }

    public DonationRequestResponseDto reject(Long id,String email)
    {
        DonationRequest request = donationRequestRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Request Not found"));
        Long userId = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user not found with email:" + email))
                .getId();

        Long donorId = donorRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User is not donor"))
                .getDonorId();

        if(!request.getDonorId().equals(donorId))
        {
            throw new AccessDeniedException("This is not your request");
        }

         request.setStatus(REJECTED);

         donationRequestRepo.save(request);

         return  donationRequestMapper.donationRequestToDonationRequestResponsedto(request);

    }








}
