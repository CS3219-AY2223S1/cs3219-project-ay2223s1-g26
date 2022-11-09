| users/{uid}                                                                             |
| --------------------------------------------------------------------------------------- |
| email (string)                                                                          |
| name (string)                                                                           |
| questionsAttempted (map) format: {'questionId': {'questionTitle', 'questionDifficulty'} |
| questionDifficulty (map) e.g. {'Easy': 2, 'Medium': 3, 'Hard': 4}                       |
| savedCode/{questionId}                                                                  |
| updatedAt(timestamp)                                                                    |

| users/{uid}/savedCode/{questionId} |
| ---------------------------------- |
| code (string)                      |
| updatedAt(timestamp)               |
