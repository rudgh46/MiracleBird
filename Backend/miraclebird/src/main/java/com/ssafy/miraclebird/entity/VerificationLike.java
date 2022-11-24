package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.dto.VerificationLikeDto;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "VerificationLike")
public class VerificationLike {

    @Id
    @Column(name = "verification_like_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long verificationLikeIdx;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verificationIdx")
    private Verification verification;

    public static VerificationLike of(VerificationLikeDto verificationLikeDto) {
        VerificationLike verificationLikeEntity = ModelMapperUtils.getModelMapper().map(verificationLikeDto, VerificationLike.class);

        return verificationLikeEntity;
    }
}
