package org.example.backend.service;

import org.example.backend.dto.QuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    private final QuestionRepository mockRepo =  mock(QuestionRepository.class);
    private final QuestionService questionService = new QuestionService(mockRepo);


    // findAll Methode testen indem 3 dummy Fragen in eine Liste gepackt werden
    @Test
    void getAllQuestions_shouldReturnList() {
    //GIVEN
    Question question1 = new Question("1", "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
    Question question2 = new Question("2", "question2", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
    Question question3 = new Question("3", "question3", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
    List<Question> expected = List.of(question1, question2, question3);

    when(mockRepo.findAll()).thenReturn(expected);

    //WHEN
    List<Question> actual = questionService.getAllQuestions();

    //THEN
    verify(mockRepo).findAll();
    assertEquals(expected, actual);
    }


    @Test
    void addQuestion_shouldReturnQuestion() {
        // GIVEN
        QuestionDTO questionToAddAdd = new QuestionDTO("question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
        Question expected = new Question("Test-Id1", "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
        when(mockRepo.save(any(Question.class))).thenReturn(expected);

        //WHEN
        Question actual = questionService.addQuestion(questionToAddAdd);

        //THEN
        verify(mockRepo).save(any(Question.class));
        assertEquals(expected, actual);
    }


    @Test
    public void testDeleteQuestionById() {
        // GIVEN
        String id = "1";

        // WHEN
        String result = questionService.deleteQuestionById(id);

        // THEN
        assertEquals("Question with ID " + id + " not found.", result);
    }

}