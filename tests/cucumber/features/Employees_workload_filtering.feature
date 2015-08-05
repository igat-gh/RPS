Feature: Filter employees in workload grid by categories

  Scenario Outline: Filter by type of project
    Given Im in "Workload" module
    When I filter employees by "<Filters>" with selector "<HTMLSelector>"
    Then I see only employees with "<Filters>" type of project at the moment with selector "<HTMLSelector>"
  Examples:
    | Filters       | HTMLSelector  |
    | Selfeducation | selfeducation |
    | Absence       | absence       |
    | Test Period   | testperiod   |


  Scenario Outline: Filter by time completion of the project
    Given Im in "Workload" module
    When I filter employees by "<Filters>" with selector "<HTMLSelector>"
    Then I see only those employees whose time the project is completed at "<Filters>" and equal filter "<URLSelector>"
  Examples:
    | Filters       | HTMLSelector  | URLSelector |
    | 1 week        | 1-week        | P7D         |
    | 2 weeks       | 2-weeks       | P14D        |
    | 1 month       | 1-month       | P1M         |