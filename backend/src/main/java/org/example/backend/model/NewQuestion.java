package org.example.backend.model;

public record NewQuestion(
        String question,
        String correctAnswer,
        String wrongAnswer1,
        String wrongAnswer2,
        String wrongAnswer3,
        int points) {

}
