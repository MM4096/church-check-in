package nz.gogonz.churchcheckin.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "relationship")
public class Relationship {
    @EmbeddedId
    private RelationshipId id;

    public Relationship() {
    }

    public Relationship(RelationshipId id) {
        this.id = id;
    }

    public RelationshipId getId() {
        return id;
    }
}
