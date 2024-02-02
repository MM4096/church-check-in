package nz.gogonz.churchcheckin.controller;

import nz.gogonz.churchcheckin.dto.PersonRequest;
import nz.gogonz.churchcheckin.dto.RelationshipResult;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.model.Relationship;
import nz.gogonz.churchcheckin.service.PersonService;
import nz.gogonz.churchcheckin.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RelationshipController {
    private final RelationshipService relationshipService;

    public RelationshipController(@Autowired RelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }

    @GetMapping("/relationships")
    public ResponseEntity<List<RelationshipResult>> getAllRelationships() {
        try {
            List<RelationshipResult> relationships = relationshipService.getAllRelationshipPersons();

            return new ResponseEntity<>(relationships, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//
//    @PostMapping("/person")
//    @ResponseBody
//    public ResponseEntity<PersonRequest> createPerson(@RequestBody PersonRequest personRequest) {
//        try {
//            System.out.println(personRequest);
//            relationshipService.save(personRequest);
//
//            return new ResponseEntity<>(personRequest, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
