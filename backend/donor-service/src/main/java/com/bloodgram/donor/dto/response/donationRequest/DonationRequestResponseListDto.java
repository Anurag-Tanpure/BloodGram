/**
 * Created by Anurag Tanpure
 * Date: 29-01-2026 06:44 pm
 */


package com.bloodgram.donor.dto.response.donationRequest;

import com.bloodgram.donor.entity.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DonationRequestResponseListDto
{

    private Long id;// request ID

    private Long receiverId;

    private RequestStatus status;

    private String userPhone;

    private LocalDateTime requestDate;

}
