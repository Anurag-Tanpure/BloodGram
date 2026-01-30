/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 08:22 pm
 */


package com.bloodgram.donor.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
