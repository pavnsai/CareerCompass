package com.ooad.careercompass.model;

import com.ooad.careercompass.utils.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String position;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "company_url")
    private String companyUrl;

    private boolean starred;

    @Column(name= "is_deleted")
    private boolean isArchived;

    private String notes;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @ManyToMany
    @JoinTable(
            name = "job_application_job_tags",
            joinColumns = @JoinColumn(name = "job_application_id"),
            inverseJoinColumns = @JoinColumn(name = "job_tag_id")
    )
    private Set<JobTag> jobTags = new HashSet<>();

    private JobApplication(Builder builder) {
        this.id = builder.id;
        this.user = builder.user;
        this.company = builder.company;
        this.position = builder.position;
        this.status = builder.status;
        this.applicationDate = builder.applicationDate;
        this.updatedAt = builder.updatedAt;
        this.companyUrl = builder.companyUrl;
        this.starred = builder.starred;
        this.isArchived = builder.isArchived;
        this.notes = builder.notes;
        this.createdAt = builder.createdAt;
        this.jobTags = builder.jobTags;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Integer id;
        private User user;
        private String company;
        private String position;
        private ApplicationStatus status;
        private LocalDate applicationDate;
        private Timestamp updatedAt;
        private String companyUrl;
        private boolean starred;
        private boolean isArchived;
        private String notes;
        private Timestamp createdAt;
        private Set<JobTag> jobTags = new HashSet<>();

        public Builder id(Integer id) {
            this.id = id;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Builder company(String company) {
            this.company = company;
            return this;
        }

        public Builder position(String position) {
            this.position = position;
            return this;
        }

        public Builder status(ApplicationStatus status) {
            this.status = status;
            return this;
        }

        public Builder applicationDate(LocalDate applicationDate) {
            this.applicationDate = applicationDate;
            return this;
        }

        public Builder updatedAt(Timestamp updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Builder companyUrl(String companyUrl) {
            this.companyUrl = companyUrl;
            return this;
        }

        public Builder starred(boolean starred) {
            this.starred = starred;
            return this;
        }

        public Builder isDeleted(boolean isDeleted) {
            this.isArchived = isDeleted;
            return this;
        }

        public Builder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public Builder createdAt(Timestamp createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder jobTags(Set<JobTag> jobTags) {
            this.jobTags = jobTags;
            return this;
        }

        public JobApplication build() {
            return new JobApplication(this);
        }
    }
}
