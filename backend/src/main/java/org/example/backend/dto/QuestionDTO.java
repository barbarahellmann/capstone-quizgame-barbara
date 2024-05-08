package org.example.backend.dto;

public record QuestionDTO(
        String question,
        String correctAnswer,
        String wrongAnswer1,
        String wrongAnswer2,
        String wrongAnswer3,
        int points

) {
}
