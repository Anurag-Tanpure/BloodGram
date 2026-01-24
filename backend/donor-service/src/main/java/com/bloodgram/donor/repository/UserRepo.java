/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 11:47 pm
 */


package com.bloodgram.donor.repository;


import com.bloodgram.donor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long>
{
    Optional<User> findByEmail(String email);
}
