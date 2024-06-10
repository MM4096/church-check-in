package nz.gogonz.churchcheckin.dto;

import nz.gogonz.churchcheckin.model.Person;

public class RelationshipResult {
    private Person parent;
    private Person child;

    public RelationshipResult() {
    }

    public RelationshipResult(Person parent, Person child) {
        this.parent = parent;
        this.child = child;
    }

    public Person getParent() {
        return parent;
    }

    public void setParent(Person parent) {
        this.parent = parent;
    }

    public Person getChild() {
        return child;
    }

    public void setChild(Person child) {
        this.child = child;
    }

    @Override
    public String toString() {
        return "RelationshipResult{" +
                "parent=" + parent +
                ", child=" + child +
                '}';
    }
}
