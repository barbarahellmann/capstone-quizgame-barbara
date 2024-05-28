package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.backend.model.Question;
import org.example.backend.service.GameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class GameController {

    // Repository wird injected
    private final GameService gameService;

    @GetMapping("/random")
    public List<Question> getRandomQuestions() {
        return gameService.getRandomQuestions(5);
    }
}