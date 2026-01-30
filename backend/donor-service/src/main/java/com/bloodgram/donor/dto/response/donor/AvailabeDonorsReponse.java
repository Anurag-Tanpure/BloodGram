/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 03:17 pm
 */


package com.bloodgram.donor.dto.response.donor;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AvailabeDonorsReponse {
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
