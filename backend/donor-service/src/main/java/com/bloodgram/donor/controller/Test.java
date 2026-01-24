/**
 * Created by Anurag Tanpure
 * Date: 23-01-2026 02:13 pm
 */


package com.bloodgram.donor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @GetMapping("/test")
    public String check()
    {
        return "Test controller working fine";
    }
}
