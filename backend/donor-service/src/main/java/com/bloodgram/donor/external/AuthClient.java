/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 02:17 pm
 */


package com.bloodgram.donor.external;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@FeignClient("auth-service")
public interface AuthClient {

    @PostMapping("/auth/internal/add-donor-role")
    void addDonorRole(@RequestParam("email") String email);

}
