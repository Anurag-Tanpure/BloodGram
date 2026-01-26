/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 06:55 pm
 */


package com.bloodgram.donor.mapper;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.response.DonorProfileResponse;
import com.bloodgram.donor.dto.response.DonorRegisterResponse;
import com.bloodgram.donor.entity.Donor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface DonorMapper
{
    @Mapping(target = "donorId", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "donationCount", ignore = true)
    @Mapping(target = "isAvailable", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Donor donorRegisterRequestToDonor(DonorRegisterRequest request);


    DonorRegisterResponse donorToDonorRegisterResponse(Donor donor);


    DonorProfileResponse donorToDonorProfileResponse(Donor donor);
}
