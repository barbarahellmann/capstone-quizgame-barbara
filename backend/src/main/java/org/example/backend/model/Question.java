package org.example.backend.model;

import lombok.With;

public record Question(

        @With String id,
        String question,
        String correctAnswer,
        String wrongAnswer1,
        String wrongAnswer2,
        String wrongAnswer3,
        int points
) {

}
