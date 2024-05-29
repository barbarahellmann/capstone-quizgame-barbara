package org.example.backend.controller;

import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private QuestionRepository repo;

    @DirtiesContext
    @Test
    void getAllQuestion_returnsEmptyList_whenCalledInitially() throws Exception {
        //GIVEN

        //WHEN
        mvc.perform(MockMvcRequestBuilders.get("/api/quiz"))
                //THEN

                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }


    @DirtiesContext
    @Test
    void getAllQuestions_WhenCallingHTTPGet() throws Exception {
        repo.save(new Question(
                "1", "question1",
                " Correct answer", "wrong answer 1",
                "wrong answer2", "wrong answer 3", false));
        repo.save(new Question(
                "2", "question2",
                " Correct answer", "wrong answer 1",
                "wrong answer2", "wrong answer 3", false));

        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/api/quiz"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                    [
                        {
                                      "id": "1",
                                      "question": "question1",
                                      "correctAnswer": " Correct answer",
                                      "wrongAnswer1": "wrong answer 1",
                                      "wrongAnswer2": "wrong answer2",
                                      "wrongAnswer3": "wrong answer 3",
                                                  "isCorrect": false
                        },
                        {
                                      "id": "2",
                                      "question": "question2",
                                      "correctAnswer": " Correct answer",
                                      "wrongAnswer1": "wrong answer 1",
                                      "wrongAnswer2": "wrong answer2",
                                      "wrongAnswer3": "wrong answer 3",
                                                  "isCorrect": false
                        }
                    ]
                    """
                )).andReturn();
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    void postQuestion_shouldReturnOk() throws Exception {
        // GIVEN

        //WHEN
        mvc.perform(post("/api/quiz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                        {
                                            "question": "question1",
                                            "correctAnswer": " Correct answer",
                                            "wrongAnswer1": "wrong answer 1",
                                            "wrongAnswer2": "wrong answer2",
                                            "wrongAnswer3": "wrong answer 3",
                                            "isCorrect": false
                                        }
                                """)
                )
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                {
                                    "question": "question1",
                                    "correctAnswer": " Correct answer",
                                    "wrongAnswer1": "wrong answer 1",
                                    "wrongAnswer2": "wrong answer2",
                                    "wrongAnswer3": "wrong answer 3",
                                    "isCorrect": false
                                }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }



    @Test
    @DirtiesContext
    void postQuestion_shouldAddQuestion_whenCalledWithDTO() throws Exception {
        // GIVEN
        Question existingQuestion = new Question("1", "question1", " Correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);

        repo.save(existingQuestion);

        //WHEN
        mvc.perform(put("/api/quiz/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                            {
                                                "question": "Updated question1",
                                                "correctAnswer": "Updated Correct answer",
                                                "wrongAnswer1": "Updated wrong answer 1",
                                                "wrongAnswer2": "Updated wrong answer2",
                                                "wrongAnswer3": "Updated wrong answer 3",
                                                "isCorrect": false
                                            }
                                """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                    {
                                        "id": "1",
                                        "question": "Updated question1",
                                        "correctAnswer": "Updated Correct answer",
                                        "wrongAnswer1": "Updated wrong answer 1",
                                        "wrongAnswer2": "Updated wrong answer2",
                                        "wrongAnswer3": "Updated wrong answer 3",
                                        "isCorrect": false
                                    }
                        """));
    }

    @Test
    @DirtiesContext
    void getByID_shouldReturnQuestion_whenCalledWithId() throws Exception {
        //GIVEN
        Question existingQuestion = new Question("1", "question1", " Correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
        repo.save(existingQuestion);

        //WHEN
        mvc.perform(get("/api/quiz/1"))

                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "id": "1",
                                "question": "question1",
                                "correctAnswer": " Correct answer",
                                "wrongAnswer1": "wrong answer 1",
                                "wrongAnswer2": "wrong answer2",
                                "wrongAnswer3": "wrong answer 3",
                                "isCorrect": false
                            }
                        """));
    }

    @Test
    @DirtiesContext
    void getByID_shouldReturnStatus404_whenCalledWithInvalidId() throws Exception {
        //GIVEN

        //WHEN
        mvc.perform(get("/api/quiz/1"))

                //THEN
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void deleteQuestion_shouldReturnOk_whenQuestionDeleted() throws Exception {
        //GIVEN
        Question existingQuestion = new Question("1", "question1", " Correct answer", "wrong answer 1", "wrong answer2", "wrong answer 3", false);
        repo.save(existingQuestion);

        //WHEN
        mvc.perform(delete("/api/quiz/1"))
                //THEN
                .andExpect(status().isOk());
    }
}
