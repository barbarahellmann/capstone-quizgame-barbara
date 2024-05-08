package org.example.backend;


import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class QuestionIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private QuestionRepository repo;

    @DirtiesContext
    @Test
    void expectedListOfQuestion_WhenCallingHTTPGet() throws Exception {
        repo.save(new Question(
                "1", "question1",
                " Correct answer", "wrong answer 1",
                "wrong answer2", "wrong answer 3", 200));
        repo.save(new Question(
                "2", "question2",
                " Correct answer", "wrong answer 1",
                "wrong answer2", "wrong answer 3", 200));

        mvc.perform(MockMvcRequestBuilders.get("/api/questions"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                    [
                        {
                            "question": "question1"
                        },
                        {
                            "question": "question2"
                        }
                    ]
                    """
                ));
    }
}