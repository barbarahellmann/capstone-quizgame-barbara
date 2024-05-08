package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.NewQuestion;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository repo;

    public List<Question> getAllQuestions() {
        return repo.findAll();
    }

    public Question save(NewQuestion newQuestion) {
       Question question = newQuestion.wi .withId(idService.generateUUID());
       repo.save(question);
       return repo.findById(question.id()).orElseThrow();

    }
}
