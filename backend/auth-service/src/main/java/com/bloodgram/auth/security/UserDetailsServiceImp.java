package com.bloodgram.auth.security;

import com.bloodgram.auth.entity.User;
import com.bloodgram.auth.repository.UserRepostiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    UserRepostiory userRepostiory;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user  = userRepostiory.findByEmail(email)
                .orElseThrow(
                        ()-> new RuntimeException("user not found eXception "));

        return new UserDetailsImp(user);

    }
}
