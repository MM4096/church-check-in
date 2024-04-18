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

    public List<Person> findByLikeName(String name) {
        String[] names = name.split("_");
        String firstName = names[0];
        String lastName = names.length > 1 ? names[1] : names[0];
        String firstNameQuery = "%" + firstName + "%";
        String lastNameQuery = "%" + lastName + "%";

        List<Person> persons;

        if (names.length > 1) {
            persons = personRepository.findByFirstnameIgnoreCaseLikeAndLastnameIgnoreCaseLike(firstNameQuery, lastNameQuery);
        } else {
            persons = personRepository.findByFirstnameIgnoreCaseLikeOrLastnameIgnoreCaseLike(firstNameQuery, lastNameQuery);
        }
        persons.forEach(person -> {
            person.setBirthday(null);
            person.setNotes(null);
            person.setPhone(null);
            person.setEmail(null);
        });

        return persons;
    }

    public List<Person> findByName(String name) {
        String[] names = name.split("_");
        String firstname = names[0];
        String lastname = names.length > 1 ? names[1] : names[0];
        return personRepository.findByFirstnameIgnoreCaseAndLastnameIgnoreCase(firstname, lastname);
    }

    public List<Person> findByFirstnameOrLastnameMatch(String name) {
        String[] names = name.split("_");
        String firstname = names[0];
        String lastname = names.length > 1 ? names[1] : names[0];
        return personRepository.findByFirstnameIgnoreCaseOrLastnameIgnoreCase(firstname, lastname);
    }

    public Person findById(long id) {
        return personRepository.findById(id);
    }

    public Person save(PersonRequest personRequest) {
        Person person = new Person(personRequest.getFirstname(), personRequest.getLastname(), personRequest.getBirthday(), personRequest.getNotes(), personRequest.getPhone(), personRequest.getEmail());
        return personRepository.save(person);
    }

    public Person updatePerson(long id, PersonRequest personRequest) {
        Person person = personRepository.findById(id);
        person.setFirstname(personRequest.getFirstname());
        person.setLastname(personRequest.getLastname());
        person.setBirthday(personRequest.getBirthday());
        person.setNotes(personRequest.getNotes());
        person.setPhone(personRequest.getPhone());
        person.setEmail(personRequest.getEmail());
        return personRepository.save(person);
    }
}
