package com.bloodgram.auth.service;

import com.bloodgram.auth.dto.request.LoginRequest;
import com.bloodgram.auth.dto.request.SignUpRequest;
import com.bloodgram.auth.entity.Role;
import com.bloodgram.auth.entity.User;
import com.bloodgram.auth.jwtUtil.JwtUtils;
import com.bloodgram.auth.repository.RoleRepository;
import com.bloodgram.auth.repository.UserRepostiory;
import com.bloodgram.auth.security.UserDetailsImp;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepostiory userRepostiory;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepostiory userRepostiory, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepostiory = userRepostiory;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public String registerUser(SignUpRequest signUpRequest)
    {
          if(userRepostiory.existsByEmail(signUpRequest.getEmail()))
          {
              return "email alredy exsists";
          }

          User user = new User();
          user.setName(signUpRequest.getName());
          user.setEmail(signUpRequest.getEmail());
          user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

          Set<Role> roles = new HashSet<>();

          for(String roleName : signUpRequest.getRoles())
          {
              Role role = roleRepository.findByRoleName(roleName)
                      .orElseThrow(()->new RuntimeException("Role not found"));
              roles.add(role);
          }

          user.setRoles(roles);
          userRepostiory.save(user);
          return "User register successfully";
    }


    public String login(LoginRequest request) {


        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserDetailsImp userDetailsImp =(UserDetailsImp) authentication.getPrincipal();

         return jwtUtils.generateToken(userDetailsImp);
    }



    public void addDonorRole(String email){
         User user = userRepostiory.findByEmail(email)
                 .orElseThrow(()-> new RuntimeException("user Not found expcetion"));

         Role donorRole = roleRepository.findByRoleName("ROLE_DONOR")
                .orElseThrow(() -> new RuntimeException("ROLE_DONOR not found"));

        if (!user.getRoles().contains(donorRole)) {
            user.getRoles().add(donorRole);
            userRepostiory.save(user);
        }

    }
}
