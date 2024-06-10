package nz.gogonz.churchcheckin.service;

import nz.gogonz.churchcheckin.dto.RelationshipRequest;
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
        return new RelationshipResult(personRepository.findById(relationship.getParentId()),
                personRepository.findById(relationship.getChildId()));
    }

    public List<RelationshipResult> getAllRelationshipPersons() {
        List<Relationship> relationships = findAll();
        List<RelationshipResult> relationshipResults = new ArrayList<>();
        for (Relationship relationship : relationships) {
            relationshipResults.add(getRelationshipPersons(relationship));
        }
        return relationshipResults;
    }

    public List<Person> getParents(String childName) {
        String[] names = childName.split("_");
        String firstName = names[0];
        String lastName = names.length > 1 ? names[1] : names[0];
        List<Person> children = personRepository.findByFirstnameIgnoreCaseAndLastnameIgnoreCase(firstName, lastName);

        List<Relationship> relationships = findAll();

        List<Person> parents = new ArrayList<>();

        for (Relationship relationship : relationships) {
            for (Person child : children) {
                if (relationship.getChildId() == child.getId()) {
                    parents.add(personRepository.findById(relationship.getParentId()));
                }
            }
        }

        return parents;
    }

    public List<Person> getParentsWithChildId(long childId) {
        List<Relationship> relationships = findAll();
        List<Person> parents = new ArrayList<>();
        for (Relationship relationship : relationships) {
            if (relationship.getChildId() == childId) {
                parents.add(personRepository.findById(relationship.getParentId()));
            }
        }
        return parents;
    }

    public boolean isParent(long id) {
        List<Relationship> relationships = findAll();
        for (Relationship relationship : relationships) {
            if (relationship.getParentId() == id) {
                return true;
            }
        }
        return false;
    }


    // TODO: problem here
    public Relationship save(RelationshipRequest relationshipRequest) {
        Relationship relationship = new Relationship(relationshipRequest.getParentId(), relationshipRequest.getChildId());
        return relationshipRepository.save(relationship);
    }

    public Relationship save(Relationship relationship) {
        return relationshipRepository.save(relationship);
    }

    // TODO: update relationship
    public RelationshipResult updateRelationship(RelationshipRequest old, RelationshipRequest updated) {
        for (Relationship relationship : findAll()) {
            if (relationship.getParentId() == old.getParentId() && relationship.getChildId() == old.getChildId()) {
                relationship.setParentId(updated.getParentId());

                relationship.setChildId(updated.getChildId());
                return getRelationshipPersons(save(relationship));
            }
        }
        System.out.println("No match");
        throw new IllegalArgumentException("Relationship not found");
    }
}
