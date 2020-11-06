# PUB QUIZ

We've all been cooped up for months this year thanks to COVID-19.
One of the things I miss is going to pub quiz nights. SO I'm working on the backend of a pub quiz app. The eventual frontend will be a React app (maybe Native?).


Designing API around being able to run a game like this:

  Premise

    - Game play is for 2 teams
    - Teams can log in to same game anywhere (like You Don't Know Jack)
      - given a team token to join a team
    - scores kept for each team

**  Full Game Rounds  **
  - Round 1 ***TRIVIA***

    - random team picks category from 5 random
    - both teams play on same 10 questions, timed round

  - Round 2 ***SONGS***

    - API not yet found
    - want to have :
      * song clip => identify title and artist (points for each)
      * option to go through ALL songs a second time
      * bonus for guessing unifying theme

  - Round 3 ***TRIVIA***

    - other team picks category from 5 random
    - both teams play on same questions, timed round

  - Round 4 ***QUOTES***

    - quote given, identify person
    - bonus for guessing theme of quotes

  - Round 5 ***TRIVIA - Lighting Round***


    - questions for time, most points wins
    - teams given random categories