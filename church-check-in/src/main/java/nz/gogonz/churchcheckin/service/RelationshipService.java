package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.dto.PersonRequest;
import nz.gogonz.churchcheckin.dto.RelationshipResult;
import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.model.Relationship;
import nz.gogonz.churchcheckin.repo.PersonRepository;
import nz.gogonz.churchcheckin.repo.RelationshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RelationshipService {
    private final RelationshipRepository relationshipRepository;
    private final PersonRepository personRepository;

    public RelationshipService(@Autowired RelationshipRepository relationshipRepository, @Autowired PersonRepository personRepository) {
        this.relationshipRepository = relationshipRepository;
        this.personRepository = personRepository;
    }

    public List<Relationship> findAll() {
        return relationshipRepository.findAll();
    }

    public RelationshipResult getRelationshipPersons(Relationship relationship) {
        return new RelationshipResult(personRepository.findById(relationship.getId().getParentId()),
                personRepository.findById(relationship.getId().getChildId()));
    }

    public List<RelationshipResult> getAllRelationshipPersons() {
        List<Relationship> relationships = findAll();
        List<RelationshipResult> relationshipResults = new ArrayList<>();
        for (Relationship relationship : relationships) {
            relationshipResults.add(getRelationshipPersons(relationship));
        }
        return relationshipResults;
    }
}
