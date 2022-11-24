package com.ssafy.miraclebird.securityOauth.domain.entity.user;

import com.ssafy.miraclebird.securityOauth.domain.entity.time.DefaultTime;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Table(name="token")
@Entity
public class Token extends DefaultTime {

    @Id
    @Column(name = "user_email", length = 50 , nullable = false)
    private String userEmail;

    @Column(name = "refresh_token", length = 200 , nullable = false)
    private String refreshToken;

    public Token(){}

    public Token updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    @Builder
    public Token(String userEmail, String refreshToken) {
        this.userEmail = userEmail;
        this.refreshToken = refreshToken;
    }
}
