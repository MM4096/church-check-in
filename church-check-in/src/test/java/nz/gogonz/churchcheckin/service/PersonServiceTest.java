package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.dto.RelationshipResult;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.repo.TestConfiguration;
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
class PersonServiceTest {
    @Autowired
    private PersonService personService;

    @Test
    void findAll() {
    }

    @Test
    void findByNameSearch() {
        List<Person> result = personService.findByLikeName("J_D");
        assertFalse(result.isEmpty());
    }
}