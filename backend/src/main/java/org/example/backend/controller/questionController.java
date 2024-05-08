package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.dto.QuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/questions")
@RequiredArgsConstructor
public class questionController {

    // Repository wird injected
    private final QuestionService service;

    @GetMapping
    public List<Question> getAllQuestions() {
        return service.getAllQuestions();
    }


    @PostMapping
    public QuestionDTO postQuestion(@RequestBody Question newQuestion) {
        Question saved = service.save(newQuestion);
        return new QuestionDTO(
                saved.id(),
                saved.question(),
                saved.correctAnswer(),
                saved.wrongAnswer1(),
                saved.wrongAnswer2(),
                saved.wrongAnswer3(),
                saved.points());
    }
}
