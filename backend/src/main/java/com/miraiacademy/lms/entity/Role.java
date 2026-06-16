package com.miraiacademy.lms.entity;

/**
 * Enum representing user roles in the system.
 */
public enum Role {
    ADMIN,      // System administrator with full access
    STAFF,      // Teacher/Instructor with course management access
    STUDENT     // Student with limited access to their own data
}