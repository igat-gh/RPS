Feature: Filter employees in workload grid by categories

  Scenario Outline:
    Given Im in "Workload" module
    When I filter employees by "<filters>"
    Then I see only employees with "<filters>" type of project at the moment
  Examples:
    | filters       |
    | Selfeducation |
    | Absence       |
    | Test Period   |