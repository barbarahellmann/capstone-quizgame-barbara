package org.example.backend.repository;


import org.example.backend.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository <Question, String> {
}
