/**
 * Created by Anurag Tanpure
 * Date: 24-01-2026 08:21 pm
 */


package com.bloodgram.donor.exception;


public class ResourceNotFoundException extends RuntimeException  {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
