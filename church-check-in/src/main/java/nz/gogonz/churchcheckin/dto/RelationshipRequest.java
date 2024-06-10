package nz.gogonz.churchcheckin.dto;

public class RelationshipRequest {
    private Long childId;
    private Long parentId;

    public RelationshipRequest() {
    }

    public RelationshipRequest(Long childId, Long parentId) {
        this.childId = childId;
        this.parentId = parentId;
    }

    public Long getChildId() {
        return childId;
    }

    public void setChildId(Long childId) {
        this.childId = childId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    @Override
    public String toString() {
        return "RelationshipRequest{" +
                "childId=" + childId +
                ", parentId=" + parentId +
                '}';
    }
}
