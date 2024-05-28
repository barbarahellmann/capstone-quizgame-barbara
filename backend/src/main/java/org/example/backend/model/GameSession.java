package org.example.backend.model;

import lombok.Data;

@Data
public class GameSession {

    Question[] quizQuestions;
    int score = 0;


    public void calScore() {
        for (Question q : quizQuestions) {
            if (q.isCorrect() == true) {
                score++;
            }
        }
    }
}
