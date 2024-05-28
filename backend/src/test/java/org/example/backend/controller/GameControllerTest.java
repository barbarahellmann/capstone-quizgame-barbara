package org.example.backend.controller;

import org.example.backend.model.Question;
import org.example.backend.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GameControllerTest {

    @Mock
    private GameService gameService;

    @InjectMocks
    private GameController gameController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(gameController).build();
    }

    @DirtiesContext
    @Test
    void getRandomQuestions_ShouldReturnFiveQuestions() throws Exception {
        List<Question> mockQuestions = Arrays.asList(
                new Question("1", "Q1", "A1", "B1", "C1", "D1", false),
                new Question("2", "Q2", "A2", "B2", "C2", "D2", false),
                new Question("3", "Q3", "A3", "B3", "C3", "D3", false),
                new Question("4", "Q4", "A4", "B4", "C4", "D4", false),
                new Question("5", "Q5", "A5", "B5", "C5", "D5", false)
        );

        when(gameService.getRandomQuestions(5)).thenReturn(mockQuestions);

        mockMvc.perform(get("/api/quiz/random")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":\"1\",\"question\":\"Q1\",\"correctAnswer\":\"A1\",\"wrongAnswer1\":\"B1\",\"wrongAnswer2\":\"C1\",\"wrongAnswer3\":\"D1\",\"isCorrect\":false},{\"id\":\"2\",\"question\":\"Q2\",\"correctAnswer\":\"A2\",\"wrongAnswer1\":\"B2\",\"wrongAnswer2\":\"C2\",\"wrongAnswer3\":\"D2\",\"isCorrect\":false},{\"id\":\"3\",\"question\":\"Q3\",\"correctAnswer\":\"A3\",\"wrongAnswer1\":\"B3\",\"wrongAnswer2\":\"C3\",\"wrongAnswer3\":\"D3\",\"isCorrect\":false},{\"id\":\"4\",\"question\":\"Q4\",\"correctAnswer\":\"A4\",\"wrongAnswer1\":\"B4\",\"wrongAnswer2\":\"C4\",\"wrongAnswer3\":\"D4\",\"isCorrect\":false},{\"id\":\"5\",\"question\":\"Q5\",\"correctAnswer\":\"A5\",\"wrongAnswer1\":\"B5\",\"wrongAnswer2\":\"C5\",\"wrongAnswer3\":\"D5\",\"isCorrect\":false}]"));
    }
}