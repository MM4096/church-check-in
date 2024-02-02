package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.dto.PersonRequest;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.repo.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(@Autowired PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public Person save(PersonRequest personRequest) {
        Person person = new Person(personRequest.getFirstname(), personRequest.getLastname(), personRequest.getBirthday(), personRequest.getNotes(), personRequest.getPhone(), personRequest.getEmail());
        return personRepository.save(person);
    }
}
