package org.example.backend.service;

import org.example.backend.dto.QuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    private final QuestionRepository mockRepo = mock(QuestionRepository.class);
    private final QuestionService questionService = new QuestionService(mockRepo);


    // findAll Methode testen indem 3 dummy Fragen in eine Liste gepackt werden
    @Test
    void getAllQuestions_shouldReturnList() {
        //GIVEN
        Question question1 = new Question("1", "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
        Question question2 = new Question("2", "question2", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
        Question question3 = new Question("3", "question3", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
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
        QuestionDTO questionToAddAdd = new QuestionDTO("question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
        Question expected = new Question("Test-Id1", "question1", "correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
        when(mockRepo.save(any(Question.class))).thenReturn(expected);

        //WHEN
        Question actual = questionService.addQuestion(questionToAddAdd);

        //THEN
        verify(mockRepo).save(any(Question.class));
        assertEquals(expected, actual);
    }

    @Test
    void updateQuestion_shouldUpdateQuestion_whenCalledWithDTO() {
        //GIVEN
        String id = "123";
        QuestionDTO questionToUpdate = new QuestionDTO("Update1", "Update correct answer", "Update wrong answer 1", "Update wrong answer 2", "Update wrong answer 3", false);
        Question existingQuestion = new Question(id, "question1", "correct answer", "wrong answer 1", "wrong answer 2", "wrong answer 3", false);
        Question updatedQuestion = new Question(id, "Update1", "Update correct answer", "Update wrong answer 1", "Update wrong answer 2", "Update wrong answer 3", false);

        when(mockRepo.findById(id)).thenReturn(Optional.of(existingQuestion));
        when(mockRepo.save(updatedQuestion)).thenReturn(updatedQuestion);

        //WHEN
        Question actual = questionService.updateQuestion(questionToUpdate, id);

        //THEN
        verify(mockRepo).findById(id);
        verify(mockRepo).save(updatedQuestion); // Verify the updated question is saved
        assertEquals(updatedQuestion, actual);
    }

    @Test
    void getQuestionById_shouldReturnQuestion_whenCalledWithId() {
        //GIVEN
        String id = "123";
        Question question = new Question("123", "question1", "correct answer", "wrong answer 1", "wrong answer 2", "wrong answer 3", false);

        when(mockRepo.findById(id)).thenReturn(Optional.of(question));

        //WHEN
        Question actual = questionService.findQuestionById(id);

        //THEN
        verify(mockRepo).findById(id);
        assertEquals(question, actual);
    }

    @Test
    void getQuestionById_shouldThrowException_whenCalledWithInvalidId() {
        //GIVEN
        String id = "123";
        when(mockRepo.findById(id)).thenReturn(Optional.empty());

        //WHEN
        assertThrows(NoSuchElementException.class, () -> questionService.findQuestionById(id));

        //THEN
        verify(mockRepo).findById(id);
    }

    @Test
    void deleteQuestion_shouldRemoveQuestion_whenCalledWithId() {
        // GIVEN
        String id = "1";
        doNothing().when(mockRepo).deleteById(id);

        // WHEN
        String result = questionService.deleteQuestionById(id);

        // THEN
        assertEquals("Question with ID " + id + " not found.", result);
    }
}