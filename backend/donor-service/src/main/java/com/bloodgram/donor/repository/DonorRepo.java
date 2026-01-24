/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 10:12 pm
 */


package com.bloodgram.donor.repository;

import com.bloodgram.donor.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepo extends JpaRepository<Donor,Long> {

}
