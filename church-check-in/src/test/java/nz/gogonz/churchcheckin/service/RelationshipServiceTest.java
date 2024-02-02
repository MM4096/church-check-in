package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.dto.RelationshipResult;
import nz.gogonz.churchcheckin.model.Relationship;
import nz.gogonz.churchcheckin.repo.TestConfiguration;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {TestConfiguration.class})
@EnableAutoConfiguration
class RelationshipServiceTest {
    @Autowired
    private RelationshipService relationshipService;

    @Test
    void findAll() {
    }

    @Test
    void getRelationshipPersons() {
    }

    @Test
    void getAllRelationshipPersons() {
        List<RelationshipResult> result = relationshipService.getAllRelationshipPersons();
        assertFalse(result.isEmpty());
    }
}