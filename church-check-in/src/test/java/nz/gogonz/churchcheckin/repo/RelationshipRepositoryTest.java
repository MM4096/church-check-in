package nz.gogonz.churchcheckin.repo;

import nz.gogonz.churchcheckin.model.Relationship;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {TestConfiguration.class})
@EnableAutoConfiguration
class RelationshipRepositoryTest {
    @Autowired
    private RelationshipRepository relationshipRepository;

    @Test
    public void findAll() {
        List<Relationship> result = relationshipRepository.findAll();
        assertFalse(result.isEmpty());
    }
}