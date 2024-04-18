package nz.gogonz.churchcheckin.controller;

import nz.gogonz.churchcheckin.dto.PersonRequest;
import nz.gogonz.churchcheckin.dto.RelationshipRequest;
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
@RequestMapping("/api/v1")
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

    @PostMapping("/relationship/create")
    @ResponseBody
    public ResponseEntity<RelationshipRequest> createRelationship(@RequestBody RelationshipRequest relationshipRequest) {
        try {
            relationshipService.save(relationshipRequest);

            return new ResponseEntity<>(relationshipRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/relationship/parents/{childName}")
    public ResponseEntity<List<Person>> getParents(@PathVariable String childName) {
        try {
            List<Person> parents = relationshipService.getParents(childName);

            return new ResponseEntity<>(parents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/relationship/parents/id/{childId}")
    public ResponseEntity<List<Person>> getParentsById(@PathVariable Long childId) {
        try {
            List<Person> parents = relationshipService.getParentsWithChildId(childId);

            return new ResponseEntity<>(parents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/relationship/isparent/{id}")
    public ResponseEntity<Boolean> isParent(@PathVariable Long id) {
        try {
            Boolean isParent = relationshipService.isParent(id);

            return new ResponseEntity<>(isParent, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/relationship/update")
    @ResponseBody
    public ResponseEntity<RelationshipResult> updateRelationship(@RequestBody RelationshipRequest[] relationshipRequest) {
        try {
            System.out.println(relationshipRequest[0].toString() + " " + relationshipRequest[1].toString());
            RelationshipRequest old = relationshipRequest[0];
            RelationshipRequest updated = relationshipRequest[1];
            RelationshipResult r = relationshipService.updateRelationship(old, updated);
            System.out.println(r.toString());

            return new ResponseEntity<>(r, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
