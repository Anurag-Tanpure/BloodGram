/**
 * Created by Anurag Tanpure
 * Date: 29-01-2026 06:52 pm
 */


package com.bloodgram.donor.mapper;

import com.bloodgram.donor.dto.response.donationRequest.DonationRequestResponseDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestResponseListDto;
import com.bloodgram.donor.dto.response.donationRequest.DonationRequestUserListResponsedto;
import com.bloodgram.donor.entity.DonationRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DonationRequestMapper {

    DonationRequestResponseDto donationRequestToDonationRequestResponsedto(DonationRequest donationRequest);

    DonationRequestResponseListDto donationRequestToDonationRequestResponseListDto(DonationRequest donationRequest);

}
