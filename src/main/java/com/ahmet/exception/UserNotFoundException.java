package com.ahmet.exception;

public class UserNotFoundException extends RuntimeException{

    // CONSTRUCTOR:
    public UserNotFoundException(Long id) {
        super("Couldn't find the user with the id " + id);
    }
}
