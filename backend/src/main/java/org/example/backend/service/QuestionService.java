package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository repo;
    private final IdService idService;

    public List<Question> getAllQuestions() {
        return repo.findAll();
    }

    public Question save(Question newQuestion) {
        Question temp = newQuestion.withId(idService.generateUUID());
        return repo.save(temp);
    }
}
