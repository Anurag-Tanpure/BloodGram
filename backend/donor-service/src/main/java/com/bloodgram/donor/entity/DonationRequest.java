/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 10:14 pm
 */


package com.bloodgram.donor.entity;

import com.bloodgram.donor.entity.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "donation_requests")
public class DonationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long receiverId;

    private Long donorId;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private String userPhone;

    private String donorPhone;

    private LocalDateTime requestDate;

    private LocalDateTime expiryDate;

}
