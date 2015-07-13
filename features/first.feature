Feature: Display employees in workload grid

  Scenario:
    Given I'm logged in as 'Admin'
    When I navigate to "Workload" module
    Then I see table of employees
    And table contains columns