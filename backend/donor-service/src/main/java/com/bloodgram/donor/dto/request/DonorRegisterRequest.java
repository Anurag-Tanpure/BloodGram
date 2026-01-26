/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:15 pm
 */


package com.bloodgram.donor.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

    @NotBlank(message = "Blood group required")
    private String bloodGroup;

    @NotBlank(message = "Name required")
    private String name;

    @NotNull(message = "Date of birth required")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender required")
    private String gender;

    @NotBlank(message = "Phone required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be 10 digits starting with 6-9")
    private String phoneNumber;

    @NotBlank(message = "City required")
    private String city;

    @NotBlank(message = "State required")
    private String state;

    @NotBlank(message = "Country required")
    private String country;

    @Min(value = 45, message = "Min weight 45kg")
    private Integer weight;

    private String imageUrl;

}
