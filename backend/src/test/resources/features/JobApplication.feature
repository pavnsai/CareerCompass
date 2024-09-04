Feature: Job Application Management

  Scenario: Create a new job application
    Given a user with ID 1
    When the user submits a request to create a new job application
    Then the system should add the job application successfully
    And the system should return a success message

  Scenario: Retrieve all unarchived job applications
    Given a user with ID 1
    When the user requests to view all unarchived job applications
    Then the system should return a list of unarchived job applications

  Scenario: Retrieve all archived job applications
    Given a user with ID 1
    When the user requests to view all archived job applications
    Then the system should return a list of archived job applications

  Scenario: Retrieve a specific job application
    Given a user with ID 1
    And a job application with ID 2
    When the user requests to view the job application with ID 2
    Then the system should return the details of the job application

  Scenario: Update an existing job application
    Given a user with ID 1
    And an existing job application with ID 2
    When the user submits a request to update the job application with ID 2
    Then the system should update the job application successfully
    And the system should return a success message

  Scenario: Archive a job application
    Given a user with ID 1
    And an existing job application with ID 2
    When the user requests to archive the job application with ID 2
    Then the system should archive the job application successfully
    And the system should return a success message

  Scenario: Unarchive a job application
    Given a user with ID 1
    And an archived job application with ID 2
    When the user requests to unarchive the job application with ID 2
    Then the system should unarchive the job application successfully
    And the system should return a success message

  Scenario: Star a job application
    Given a user with ID 1
    And an existing job application with ID 2
    When the user requests to star the job application with ID 2
    Then the system should mark the job application as starred
    And the system should return a success message
