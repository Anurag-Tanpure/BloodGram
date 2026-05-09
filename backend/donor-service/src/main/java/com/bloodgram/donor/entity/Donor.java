/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 02:23 pm
 */


package com.bloodgram.donor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "donor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donorId;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable=false)
    private String name;

    @Column(nullable = false)
    private String bloodGroup;

    private LocalDate dateOfBirth;

    private String gender;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    private String city;
    private String state;
    private String country;

    private LocalDate lastDonationDate;

    private Integer donationCount;

    private Integer weight;

    @Column(name = "is_available", nullable = false, columnDefinition = "BOOLEAN")
    private Boolean isAvailable;

    private String imageUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
