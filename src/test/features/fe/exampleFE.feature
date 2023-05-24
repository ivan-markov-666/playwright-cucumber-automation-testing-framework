Feature: Test the realExampleFE

    @test
    Scenario: Test the realExampleFE step by step
        Given Navigate to the 'text-box' page
        Then Fill with 'John Doe' value into the Full Name input text element
        Then Fill with 'testingemail@qa4free.com' value into the Email input text element
        Then Fill with 'testing address' value into the Current Address input text element
        Then Fill with 'testing permanent address' value into the Permanent Address input text element
        Then Click on the Submit button from the Text Box form
        Then The user waits 5 seconds

    @test
    Scenario: Test the realExampleFE
        Given Test the realExampleFE
        Then The user waits 5 seconds