package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.VerificationDto;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Verification")
public class Verification {
    @Id
    @Column(name = "verification_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long verificationIdx;

    @Column(nullable = false)
    private long approval;

    @Column(nullable = true)
    private LocalDateTime regtime;

    @Column(nullable = true)
    private String selfie;

    @Column(nullable = true)
    private Boolean share;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challengeIdx")
    private Challenge challenge;

    @OneToMany(mappedBy = "verification")
    List<Report> report = new ArrayList<>();

    @OneToMany(mappedBy = "verification")
    List<VerificationLike> verificationLikes = new ArrayList<>();

    public static Verification of(VerificationDto verificationDto) {
        Verification verificationEntity = ModelMapperUtils.getModelMapper().map(verificationDto, Verification.class);

        return verificationEntity;
    }

}
