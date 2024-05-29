package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final QuestionRepository repo;
    private final Random random = new Random();

    public List<Question> getRandomQuestions(int numberOfQuestions) {
        List<Question> allQuestions = repo.findAll();
        return random.ints(0, allQuestions.size())
                .distinct()
                .limit(numberOfQuestions)
                .mapToObj(allQuestions::get)
                .collect(Collectors.toList());
    }
}
