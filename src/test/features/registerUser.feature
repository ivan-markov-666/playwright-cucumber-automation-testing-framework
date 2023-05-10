Feature: Register User

    Scenario: Register new user
        Given I navigate to the register page
        When I created a new user
        Then I confirm user registration is success