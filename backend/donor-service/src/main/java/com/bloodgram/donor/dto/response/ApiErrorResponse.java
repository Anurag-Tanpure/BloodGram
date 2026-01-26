/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 08:25 pm
 */


package com.bloodgram.donor.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiErrorResponse {

    int status;
    String error;
    String message;
    String path;
    LocalDateTime timestam;

}
