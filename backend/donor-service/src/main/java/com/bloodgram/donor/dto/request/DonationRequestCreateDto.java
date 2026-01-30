/**
 * Created by Anurag Tanpure
 * Date: 29-01-2026 01:01 pm
 */


package com.bloodgram.donor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DonationRequestCreateDto {

    private Long donorId;

    private String userPhone;
}
