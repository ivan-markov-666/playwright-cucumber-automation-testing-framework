Feature: Text Box

    Background: Navigate to the page
        Given Navigate to text-box page

    Scenario: Fill the text box form
        When Fill the Full Name field
        When Fill the Email field
        When Fill the Current Address field
        When Fill the Permanent Address field
        When Click the button Submit
        Then Verify that the form was filled correctly
