package security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {


    @Autowired
    private MockMvc mvc;

    @Test
    @WithMockUser(username = "test-user")
    void testGetMe_WithLoggedInUser_expectedUsername() throws Exception {
        mvc.perform(get("api/quiz/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("test-user"));
    }

    @Test
    void testGetMe_WithoutLoggedInUser_expectedAnonymousUser() throws Exception {
        mvc.perform(get("api/quiz/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }
}
