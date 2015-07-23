Feature: Filter employees in workload grid by Selfeducation

  Scenario:
    Given Im in "Workload" module
    When I filter employees by "Selfeducation"
    Then I see only employees with "Selfeducation" type of project at the moment