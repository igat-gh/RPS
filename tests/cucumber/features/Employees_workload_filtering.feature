Feature: Filter employees in workload grid by categories

  Scenario Outline: Filter by type of project
    Given Im in "Workload" module
    When I filter employees by "<ProjectType>" project type
    Then I see only employees with "<ProjectType>" type of project at the moment
  Examples:
    | ProjectType   |
    | Selfeducation |
    | Absence       |
    | Test Period   |


  Scenario Outline: Filter by time completion of the project
    Given Im in "Workload" module
    When I filter employees by "<DateFilter>" date range
    Then I see only employees with "Project End Date" value earlier than "<DateFilter>" from now
    And I see only employees with "Project Time Left" value no more than "<DateFilter>"
  Examples:
    | DateFilter    |
    | 1 week        |
    | 2 weeks       |
    | 1 month       |