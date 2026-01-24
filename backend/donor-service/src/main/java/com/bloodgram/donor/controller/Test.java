/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 02:13 pm
 */


package com.bloodgram.donor.controller;

import com.bloodgram.donor.dto.request.DonorRegisterRequest;
import org.springframework.web.bind.annotation.*;

@RestController
public class Test {



    @PostMapping("/test")
    public String check(@RequestBody DonorRegisterRequest request)
    {



    }
}
