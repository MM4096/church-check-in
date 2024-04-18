package nz.gogonz.churchcheckin.model;

import jakarta.persistence.*;

@Entity
@Table(name = "relationship")
public class Relationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "parent_id")
    private long parentId;

    @Column(name = "child_id")
    private long childId;


    public Relationship() {
    }

    public Relationship(long parentId, long childId) {
        this.parentId = parentId;
        this.childId = childId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getParentId() {
        return parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public long getChildId() {
        return childId;
    }

    public void setChildId(long childId) {
        this.childId = childId;
    }
}
