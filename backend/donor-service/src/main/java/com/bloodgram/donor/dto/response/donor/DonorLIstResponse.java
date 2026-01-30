/**
 * Created by Anurag Tanpure
 * Date: 26-01-2026 11:11 pm
 */


package com.bloodgram.donor.dto.response.donor;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DonorLIstResponse
{
    private Long donorId;

    private String name;

    private String bloodGroup;

    private String gender;

    private String city;

    private String state;

    private String country;

    private Boolean isAvailable;

    private String imageUrl;
}
