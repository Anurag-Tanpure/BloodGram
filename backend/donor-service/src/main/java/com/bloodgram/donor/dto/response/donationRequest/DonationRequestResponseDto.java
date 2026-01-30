/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 10:31 pm
 */


package com.bloodgram.donor.dto.response.donationRequest;

import com.bloodgram.donor.entity.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationRequestResponseDto {

    private Long receiverId;

    private Long donorId;

    private RequestStatus status;

    private LocalDateTime requestDate;

}
