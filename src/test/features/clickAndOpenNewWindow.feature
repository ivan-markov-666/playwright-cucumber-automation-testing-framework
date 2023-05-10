Feature: Click and open a new tab

    @test-dsl
    Scenario: Click and open a new tab
        Given Navigate to the browser-windows page
        When Click on the element and open a new page
        Then Print message for testing
