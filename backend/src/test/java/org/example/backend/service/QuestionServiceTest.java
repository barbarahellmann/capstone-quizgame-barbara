package org.example.backend.service;

import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    private final QuestionRepository mockRepo =  mock(QuestionRepository.class);
    private final IdService idMock = mock(IdService.class);
    private final QuestionService mockService = new QuestionService(mockRepo, idMock);


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
    List<Question> actual = mockService.getAllQuestions();

    //THEN
    verify(mockRepo).findAll();
    assertEquals(expected, actual);
    }


    @Test
    void save_shouldReturnQuestion() {
        // GIVEN
        Question questionToSave = new Question("abc", "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
        Question expected = new Question("1", "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", 200);
        when(idMock.generateUUID()).thenReturn("1");
        when(mockRepo.findByID("1")).thenReturn(Optional.of(expected));

        //WHEN
        Question actual = mockService.save(questionToSave);

        //THEN
        assertEquals(expected, actual);
        verify(idMock).genrateUUID();
        verify(mockRepo).save();


    }

}