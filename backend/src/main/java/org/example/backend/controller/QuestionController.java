package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.dto.QuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    //   @DeleteMapping("/{id}")
    //   public String deleteQuestion(@PathVariable String id) {
    //       return service.deleteQuestionById(id);
    //   }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable String id) {
        boolean deleted = Boolean.parseBoolean(service.deleteQuestionById(id));

        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Question mit der ID: " + id + " erfolgreich gelöscht!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question mit der ID: " + id + " nicht gefunden.");
        }
    }
}
