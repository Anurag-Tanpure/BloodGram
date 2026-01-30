/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 07:36 pm
 */


package com.bloodgram.donor.dto.response.donor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorRegisterResponse
{
    private Long donorId;

    private String name;

    private String bloodGroup;

    private LocalDate dateOfBirth;

    private String gender;

    private String phoneNumber;

    private String city;

    private String state;

    private String country;

    private LocalDate lastDonationDate;

    private Integer donationCount;

    private Integer weight;

    private Boolean isAvailable;

    private String imageUrl;

}
