package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.QuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository repo;

    public List<Question> getAllQuestions() {
        return repo.findAll();
    }

    public Question addQuestion(QuestionDTO newQuestion) {
        Question temp = new Question(
                null,
                newQuestion.question(),
                newQuestion.correctAnswer(),
                newQuestion.wrongAnswer1(),
                newQuestion.wrongAnswer2(),
                newQuestion.wrongAnswer3(),
                newQuestion.points()
        );
        return repo.save(temp);
    }


    // vielleicht gibt es hier probleme wegen der ID
    public Question updateQuestion(QuestionDTO questionDTO, String id) {
        Question existingQuestion = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Question with id: " + id + " not found!"));

        Question updatedQuestion = new Question(
                existingQuestion.id(),
                questionDTO.question(),
                questionDTO.correctAnswer(),
                questionDTO.wrongAnswer1(),
                questionDTO.wrongAnswer2(),
                questionDTO.wrongAnswer3(),
                questionDTO.points()
        );

        return repo.save(updatedQuestion);
    }

    public Question findQuestionById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Question with id: " + id + " not found!"));
    }

    public String deleteQuestionById(String id) {
        try {
            repo.delete(repo.findById(id).orElseThrow());
            return "Question with ID " + id + " successfully deleted";
        } catch (NoSuchElementException e) {
            return "Question with ID " + id + " not found.";
        }
    }
}
