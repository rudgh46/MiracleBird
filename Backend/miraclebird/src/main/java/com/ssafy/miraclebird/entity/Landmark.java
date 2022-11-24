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
@Table(name = "Landmark")
public class Landmark {

    @Id
    @Column(name = "landmark_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long landmarkIdx;

    @Column(nullable = true)
    private String hash;

    @Column(nullable = true, name = "star_force")
    private long starForce;

    @Column(nullable = true)
    private Boolean selling;

    @Column(nullable = true, name = "sell_price")
    private long sellPrice;

    @Column(nullable = true, name = "token_id")
    private long tokenId;

    @Column(nullable = true, name = "json_path")
    private String jsonPath;

    @Column(nullable = true, name = "image_path")
    private String imagePath;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landmarkInfoIdx")
    private Landmark_Info landmarkInfo;

    @OneToMany(mappedBy = "landmark")
    List<Price> price = new ArrayList<>();

    @OneToMany(mappedBy = "landmark")
    List<Mynft> mynft = new ArrayList<>();
}
