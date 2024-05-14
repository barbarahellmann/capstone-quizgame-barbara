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


    @PostMapping
    public Question postQuestion(@RequestBody QuestionDTO newQuestion) {
        return service.save(newQuestion);
    }


    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable String id) {
        return service.deleteQuestionById(id);
    }
}
