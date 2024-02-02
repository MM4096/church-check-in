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

@RestController
@RequestMapping("/api")
public class PersonController {
    private final PersonService personService;

    public PersonController(@Autowired PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/persons")
    public ResponseEntity<List<Person>> getAllPersons() {
        try {
            List<Person> persons = personService.findAll();

            return new ResponseEntity<>(persons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/person")
    @ResponseBody
    public ResponseEntity<PersonRequest> createPerson(@RequestBody PersonRequest personRequest) {
        try {
            System.out.println(personRequest);
            personService.save(personRequest);

            return new ResponseEntity<>(personRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
