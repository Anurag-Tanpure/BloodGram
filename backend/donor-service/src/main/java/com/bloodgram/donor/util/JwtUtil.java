/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026
 */

package com.bloodgram.donor.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.List;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // this method returns email from token
    public String getUsernameFromToken(String authHeader) {

        if (!authHeader.startsWith("Bearer ")) {
            throw new JwtException("Invalid Authorization header");
        }

        String token = authHeader.substring(7);

        return extractAllClaims(token).getSubject();
    }

    // Roles
    public List<String> getRoles(String token) {

        return extractAllClaims(token).get("roles", List.class);
    }

    // Validation
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
