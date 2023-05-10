Feature: Navigate Forward example

    @test-dsl
    Scenario: Navigate to the forward page
        Given Navigate to text-box page
        When Go forward
        Then Print message for testing
