package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Challenger")
public class Challenger {

    @Id
    @Column(name = "challenger_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challengerIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challengeIdx")
    private Challenge challenge;

    @Column
    private boolean deposit;
}
