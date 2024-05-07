package org.example.backend.service;

import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    QuestionRepository mockRepo =  mock(QuestionRepository.class);
    QuestionService questionService = new QuestionService(mockRepo);


    // findAll Methode testen indem 3 dummy Fragen in eine Liste gepackt werden
    @Test
    void getAllQuestions_shouldReturnList() {
    //GIVEN
    Question question1 = new Question(1, "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
    Question question2 = new Question(2, "question2", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
    Question question3 = new Question(3, "question3", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
    List<Question> expected = List.of(question1, question2, question3);

    when(mockRepo.findAll()).thenReturn(expected);

    //WHEN
    List<Question> actual = questionService.getAllQuestions();

    //THEN
    verify(mockRepo).findAll();
    assertEquals(expected, actual);
    }
}