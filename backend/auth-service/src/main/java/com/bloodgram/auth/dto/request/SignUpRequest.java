package com.bloodgram.auth.dto.request;

import com.bloodgram.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

    private String name;
    private String email;
    private String password;
    private Set<String> roles;

}
