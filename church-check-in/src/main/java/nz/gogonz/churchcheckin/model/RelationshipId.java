package nz.gogonz.churchcheckin.model;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class RelationshipId implements Serializable {
    @Column(name = "parent_id")
    private long parentId;

    @Column(name = "child_id")
    private long childId;

    public RelationshipId() {
    }

    public RelationshipId(long parentId, long childId) {
        this.parentId = parentId;
        this.childId = childId;
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
