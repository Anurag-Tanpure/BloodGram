/**
 * Created by Anurag Tanpure
 * Date: 29-01-2026
 */

package com.bloodgram.donor.util;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("yaha tk chala");
        String header = request.getHeader("Authorization");

        System.out.println("2 br ");
        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            System.out.println("yaa be hia ");
            if (jwtUtil.validateToken(token)) {

                System.out.println("yaha ni he lala");
                String email = jwtUtil.getUsernameFromToken(header);
                List<String> roles = jwtUtil.getRoles(token);

                List<SimpleGrantedAuthority> authorities =
                        roles.stream()
                                .map(SimpleGrantedAuthority::new)
                                .toList();

                authorities.forEach(System.out::println);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                authorities
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
