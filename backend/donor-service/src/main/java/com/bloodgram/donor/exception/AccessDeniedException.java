/**
 * Created by Anurag Tanpure
 * Date: 30-01-2026 02:42 pm
 */


package com.bloodgram.donor.exception;

public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException(String message) {
        super(message);
    }
}
