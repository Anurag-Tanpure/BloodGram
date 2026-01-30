/**
 * Created by Anurag Tanpure
 * Date: 30-01-2026 01:13 pm
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
public class DonationRequestUserListResponsedto {

    private Long id;// Request Id

    private Long donorId;

    private String donorname;

    private String donorPhone;

    private String bloodGroup;

    private String city;

    private RequestStatus status;

    private LocalDateTime requestDate;

}
