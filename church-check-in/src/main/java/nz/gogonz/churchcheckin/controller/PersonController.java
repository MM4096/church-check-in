package nz.gogonz.churchcheckin.controller;

import nz.gogonz.churchcheckin.dto.PersonRequest;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1")
public class PersonController {
    private final PersonService personService;

    public PersonController(@Autowired PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/person/all")
    public ResponseEntity<List<Person>> getAllPersons() {
        try {
            List<Person> persons = personService.findAll();

            return new ResponseEntity<>(persons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="person", method = RequestMethod.GET)
    public ResponseEntity<List<Person>> getPersonsByName(@RequestParam("name") String name) {
        try {
            if (name.isEmpty()){
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }

            List<Person> persons = personService.findByLikeName(name);

            return new ResponseEntity<>(persons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/person/{name}")
    public ResponseEntity<List<Person>> getPersonsByFullName(@PathVariable String name) {
        try {
            if (name.isEmpty()){
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }

            List<Person> persons = personService.findByFirstnameOrLastnameMatch(name);

            return new ResponseEntity<>(persons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/person/id/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable long id) {
        try {
            Person person = personService.findById(id);

            return new ResponseEntity<>(person, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/person/create")
    @ResponseBody
    public ResponseEntity<Person> createPerson(@RequestBody PersonRequest personRequest) {
        try {
            Person person = personService.save(personRequest);

            return new ResponseEntity<>(person, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/person/update/{id}")
    @ResponseBody
    public ResponseEntity<Person> updatePerson(@PathVariable long id, @RequestBody PersonRequest personRequest) {
        try {
            Person person = personService.updatePerson(id, personRequest);

            return new ResponseEntity<>(person, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
