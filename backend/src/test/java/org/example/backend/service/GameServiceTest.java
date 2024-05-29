package org.example.backend.service;

import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class GameServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private GameService gameService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getRandomQuestions_ShouldReturnFiveQuestions() {
        List<Question> mockQuestions = Arrays.asList(
                new Question("1", "Q1", "A1", "B1", "C1", "D1", false),
                new Question("2", "Q2", "A2", "B2", "C2", "D2", false),
                new Question("3", "Q3", "A3", "B3", "C3", "D3", false),
                new Question("4", "Q4", "A4", "B4", "C4", "D4", false),
                new Question("5", "Q5", "A5", "B5", "C5", "D5", false),
                new Question("6", "Q6", "A6", "B6", "C6", "D6", false)
        );

        when(questionRepository.findAll()).thenReturn(mockQuestions);

        List<Question> randomQuestions = gameService.getRandomQuestions(5);
        assertEquals(5, randomQuestions.size());
    }

}