package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.backend.dto.QuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuestionController {

    // Repository wird injected
    private final QuestionService service;

    @GetMapping
    public List<Question> getAllQuestions() {
        return service.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return service.findQuestionById(id);
    }

    @PostMapping
    public Question postQuestion(@RequestBody QuestionDTO newQuestion) {
        return service.addQuestion(newQuestion);
    }

    @PutMapping("/{id}")
    public Question putQuestion(@RequestBody QuestionDTO questionDTO, @PathVariable String id) {
        return service.updateQuestion(questionDTO, id);
    }
    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable String id) {
        service.deleteQuestionById(id);
    }
}
