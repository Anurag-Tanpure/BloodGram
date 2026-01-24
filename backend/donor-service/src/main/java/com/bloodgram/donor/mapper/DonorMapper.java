/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 06:55 pm
 */


package com.bloodgram.donor.mapper;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import com.bloodgram.donor.entity.Donor;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface DonorMapper
{

    Donor donorRegisterRequestToDonor(DonorRegisterRequest request);

}
