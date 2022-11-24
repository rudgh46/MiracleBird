package com.ssafy.miraclebird.securityOauth.domain.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.miraclebird.entity.*;
import com.ssafy.miraclebird.securityOauth.domain.entity.time.DefaultTime;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "User")
public class User extends DefaultTime {
    @Id
    @Column(name = "user_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userIdx;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = true)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean blacklist = false;

    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "kakao_token")
    private String kakaoToken;

    @Column(name = "token_period")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime tokenPeriod;
    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String providerId;

    @Builder
    public User(String name, String email, String password, Role role, Provider provider, String providerId, String imageUrl){
        this.email = email;
        this.password = password;
        this.name = name;
        this.provider = provider;
        this.role = role;
    }

    public void updateName(String name){
        this.name = name;
    }

    public void updateImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }

    /* 연관관계 매핑 */
    @OneToOne(mappedBy = "user")
    private Wallet wallet;

    @OneToMany(mappedBy = "user")
    List<Verification> verification = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Challenger> challenger = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Landmark> landmark = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Post> post = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Comment> comment = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Transaction> transaction = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Report> report = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<VerificationLike> verificationLikes = new ArrayList<>();

    public static User of(UserDto userDto) {
        User userEntity = ModelMapperUtils.getModelMapper().map(userDto, User.class);

        return userEntity;
    }
}
