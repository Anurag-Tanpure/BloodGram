/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 11:46 pm
 */


package com.bloodgram.donor.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;
}
