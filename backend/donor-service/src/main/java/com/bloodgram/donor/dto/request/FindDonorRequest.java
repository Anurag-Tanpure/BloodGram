/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 03:16 pm
 */


package com.bloodgram.donor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindDonorRequest {

    String bloodGroup;
    String city;
    String state;
    String country;
}
