package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.backend.model.Question;
import org.example.backend.service.QuestionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/questions")
@RequiredArgsConstructor
public class questionController {


    private final QuestionService questionService;

    @GetMapping
    List<Question> getAllQuestions() {
        return questionService.getAllQuestions();

    }
}
