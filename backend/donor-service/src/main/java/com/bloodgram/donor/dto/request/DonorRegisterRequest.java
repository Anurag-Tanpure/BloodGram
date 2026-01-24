/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:15 pm
 */


package com.bloodgram.donor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorRegisterRequest {

    private String bloodGroup;
    private LocalDate dateOfBirth;

    private String gender;
    private String phoneNumber;

    private String city;
    private String state;
    private String country;
    private Integer weight;
    private String imageUrl;

}
