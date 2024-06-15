package nz.gogonz.churchcheckin.model;


import jakarta.persistence.*;

import java.sql.Timestamp;


@Entity
@Table(name = "tokens")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "admin_id")
    private long adminId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "issue_date")
    private Timestamp issueDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expiry_date")
    private Timestamp expiryDate;

    @Column(name = "token")
    private String token;

    @Column(name = "is_valid")
    private Boolean isValid;

    public Token() {
    }

    public Token(long adminId, Timestamp issueDate, Timestamp expiryDate, String token, Boolean isValid) {
        this.adminId = adminId;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
        this.token = token;
        this.isValid = isValid;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAdminId() {
        return adminId;
    }

    public void setAdminId(long adminId) {
        this.adminId = adminId;
    }

    public Timestamp getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Timestamp issueDate) {
        this.issueDate = issueDate;
    }

    public Timestamp getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Timestamp expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Boolean getValid() {
        return isValid;
    }

    public void setValid(Boolean valid) {
        isValid = valid;
    }
}
