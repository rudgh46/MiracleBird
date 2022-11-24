package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.dto.MynftDto;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Mynft")
public class Mynft {
    @Id
    @Column(name = "mynft_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mynftIdx;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "walletIdx")
    private Wallet wallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LandmarkIdx")
    private Landmark landmark;

    public static Mynft of(MynftDto mynftDto) {
        Mynft mynftEntity = ModelMapperUtils.getModelMapper().map(mynftDto, Mynft.class);

        return mynftEntity;
    }
}
