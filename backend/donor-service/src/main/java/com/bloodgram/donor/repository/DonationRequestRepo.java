/**
 * Created by Anurag Tanpure
 * Date: 28-01-2026 10:27 pm
 */


package com.bloodgram.donor.repository;

import com.bloodgram.donor.entity.DonationRequest;
import com.bloodgram.donor.entity.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRequestRepo extends JpaRepository<DonationRequest,Long> {

    Optional<List<DonationRequest>> findByDonorIdAndExpiryDateAfter(Long donorId, LocalDateTime now);

    Optional<List<DonationRequest>> findByReceiverIdAndExpiryDateAfter(Long receiverId, LocalDateTime now);

    boolean existsByReceiverIdAndDonorIdAndStatus(Long receiverId, Long donorId, RequestStatus status);

    Optional<List<DonationRequest>> findByReceiverId(Long receiverId);

    Optional<List<DonationRequest>> findByDonorId(Long donorId);

    Optional<DonationRequest> findById(Long id);

}
