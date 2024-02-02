package nz.gogonz.churchcheckin.repo;

import nz.gogonz.churchcheckin.model.Person;
import nz.gogonz.churchcheckin.model.Relationship;
import nz.gogonz.churchcheckin.model.RelationshipId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends CrudRepository<Relationship, RelationshipId> {
    List<Relationship> findAll();
}