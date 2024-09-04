package com.ooad.careercompass.model;

import com.ooad.careercompass.utils.CareerCompassUtils;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "verify_hash", nullable = false)
    private String verifyHash;

    @Column(name = "is_verified")
    private boolean isVerified;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;


    public User(String firstName, String lastName, String email, String password, String role, String phoneNumber) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.createdAt= new Timestamp(System.currentTimeMillis());
        this.verifyHash= CareerCompassUtils.getInstance().generateUniqueHash();
        this.isVerified=true;
        this.role=role;
        this.phoneNumber=phoneNumber;
    }
}
