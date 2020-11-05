
Designing API around being able to run a game like this:

  Premise:
    - Game play is for 2 teams
    - Teams can log in to same game anywhere (like you don't know jack)
      - given a team token to join a team
    - scores kept for each team

  Full Game Rounds:
    Round 1 **trivia**
              random team picks category from 5 random
              both teams play on same 10 questions, timed round
          2 **songs**
              API not yet found
              want to have :
                song clip => identify title and artist (points for each)
                option to go through ALL songs a second time
                bonus for guessing unifying theme
          3 **trivia**
              other team picks category from 5 random
              both teams play on same questions, timed round
          4 **quotes**
              quote given, identify person
              bonus for guessing theme of quotes
          5 **trivia - lighting Round**
              questions for time, most points wins
              teams given random categories