/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 06:55 pm
 */


package com.bloodgram.donor.mapper;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.dto.response.donor.AvailabeDonorsReponse;
import com.bloodgram.donor.dto.response.donor.DonorProfileResponse;
import com.bloodgram.donor.dto.response.donor.DonorRegisterResponse;
import com.bloodgram.donor.entity.Donor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

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

    AvailabeDonorsReponse donorToAvailabeDonorsResponse(Donor donor);


}
