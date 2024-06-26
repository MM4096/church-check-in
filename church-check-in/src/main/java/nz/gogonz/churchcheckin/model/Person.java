package nz.gogonz.churchcheckin.model;


import jakarta.persistence.*;



@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "notes")
    private String notes;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "year")
    private Integer year;


    public Person() {

    }

    public Person(String firstname, String lastname, String birthday, String notes, String phone, String email, Integer year) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.notes = notes;
        this.phone = phone;
        this.email = email;
        this.year = year;
    }

    public Long getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", birthday='" + birthday + '\'' +
                ", notes='" + notes + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", year='" + year + '\'' +
                '}';
    }

    public static Person fromPerson(Person person){
        return person == null ? null : new Person(person.getFirstname(), person.getLastname(), person.getBirthday(), person.getNotes(), person.getPhone(), person.getEmail(), person.getYear());
    }
}

