package com.bloodgram.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Test {

    @Id
    int id;

    String username;
}
