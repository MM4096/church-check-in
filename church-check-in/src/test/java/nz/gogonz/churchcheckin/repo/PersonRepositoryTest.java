package nz.gogonz.churchcheckin.repo;

import nz.gogonz.churchcheckin.model.Person;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {TestConfiguration.class})
@EnableAutoConfiguration
class PersonRepositoryTest {
    @Autowired
    private PersonRepository personRepository;

    @Test
    public void findAll() {
        List<Person> result = personRepository.findAll();
        assertFalse(result.isEmpty());
    }

    @Test
    public void findByFirstname() {
        List<Person> result = personRepository.findByFirstname("John");
        assertFalse(result.isEmpty());
    }

    @Test
    public void findByFirstnameLike() {
        List<Person> result = personRepository.findByFirstnameIgnoreCaseLikeOrLastnameIgnoreCaseLike("%g%", "%g%");
        assertFalse(result.isEmpty());
    }

    @Test
    public void findByString() {
        List<Person> result = personRepository.findAll().stream()
            .filter(person ->
                    person.getFirstname().matches("(?i)^" + Pattern.quote("a") + ".*"))//(1)
            .map(Person::fromPerson).toList();
        assertFalse(result.isEmpty());
    }
}